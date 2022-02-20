import Charts from "../model/Charts";

export default interface IChartRepository {
  charts: Charts;
  getFullDepthChart();
  getDepthChartForPosition(position: string);
  createChart(position: string);
  addPlayerToDepthChart(id: number, position: string, index: number);
  addFirstPlayerToDepthChart(id: number, position: string);
  removePlayerFromDepthChart(id: number, position: string);
}
