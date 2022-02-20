export default class Charts {
  name: string;
  depthCharts: Map<String, Array<number>>;

  constructor() {
    this.depthCharts = new Map();
  }

  getFullDepthChart() {
    return this.depthCharts;
  }
  setDepthChart(position: string) {
    this.depthCharts.set(position, []);
  }

  getDepthChartForPosition(position: string) {
    return this.depthCharts.get(position);
  }

  updateDepthChartForPosition(id: number, position: string, index: number) {
    this.depthCharts.get(position).splice(index, 0, id);
  }

  addFirstPlayerToDepthChart(id: number, position: string) {
    this.depthCharts.set(position, [id]);
  }

  removePlayerFromDepthChart(index: number, position: string) {
    this.depthCharts.get(position).splice(index, 1);
  }
}
