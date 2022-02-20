import Player from "../model/Player";
export default interface IChartService {
  createDepthChartForPosition(position: string): void;
  addPlayerToDepthChart(player: Player, position: string, index: number): void;
  getFullDepthChart(): Map<String,Array<number>>;
  getPlayersUnderPlayerInDepthChart(player: Player, position: string): Array<number>;
  removePlayerFromDepthChart(player: Player, position: string): void;
}
