import Charts from "../model/Charts";

export default class ChartRepository {
  charts: Charts;
  constructor() {
    this.charts = new Charts();
  }

  public getFullDepthChart() {
    return this.charts.getFullDepthChart();
  }
  public getDepthChartForPosition(position: string) {
    return this.charts.getDepthChartForPosition(position);
  }

  public createChart(position: string) {
    this.charts.setDepthChart(position);
  }

  public addPlayerToDepthChart(id: number, position: string, index: number) {
    this.charts.updateDepthChartForPosition(id, position, index);
  }

  public addFirstPlayerToDepthChart(id: number, position: string) {
    this.charts.addFirstPlayerToDepthChart(id, position);
  }

  public removePlayerFromDepthChart(id: number, position: string) {
    this.charts.removePlayerFromDepthChart(id, position);
  }
}
