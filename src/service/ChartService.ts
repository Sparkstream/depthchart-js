import ChartRepository from "../repository/ChartRepository";
import IChartService from "./IChartService";
import IChartRepository from "../repository/IChartRepository";
import Player from "../model/Player";

export default class ChartService implements IChartService {
  chartRepository: ChartRepository;

  constructor(chartRepository: IChartRepository) {
    this.chartRepository = chartRepository;
  }
  public createDepthChartForPosition(position) {
    this.chartRepository.createChart(position);
  }

  public addPlayerToDepthChart(
    player: Player,
    position: string,
    index: number
  ) {
    let depthChart = this.chartRepository.getDepthChartForPosition(position);
    if (depthChart.length === 0) {
      this.chartRepository.addFirstPlayerToDepthChart(
        player.player_id,
        position
      );
    } else {
      if (depthChart.length < index) {
        index = depthChart.length;
      }
      this.chartRepository.addPlayerToDepthChart(
        player.player_id,
        position,
        index
      );
    }
  }

  public getFullDepthChart() : Map<String,Array<number>> {
    let depthChart = this.chartRepository.getFullDepthChart();
    depthChart.forEach((value, key) => {
        console.log(key + " : [" + value + "]");
    });
    return depthChart;
  }

  public getPlayersUnderPlayerInDepthChart(player: Player, position: string) : Array<number>{
    let depthChartPlayerIsIn = this.chartRepository.getDepthChartForPosition(
      position
    );
    let indexOfPlayer = depthChartPlayerIsIn.indexOf(player.player_id);
    if (indexOfPlayer < 0) {
      return []
    }
    return depthChartPlayerIsIn.slice(indexOfPlayer + 1)
  }

  public removePlayerFromDepthChart(player: Player, position: string) : void{
    let depthChart = this.chartRepository.getDepthChartForPosition(position);
    let indexOfPlayer = depthChart.indexOf(player.player_id);
    if (indexOfPlayer !== -1) {
      this.chartRepository.removePlayerFromDepthChart(indexOfPlayer, position);
    }
  }
}
