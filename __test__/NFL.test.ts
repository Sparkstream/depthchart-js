//addPlayerToDepthChart
// basic adding works
// get chart
// get everyone underneath player
// remove

// invalid positions?

import Player from "../src/model/Player";
import ChartRepository from "../src/repository/ChartRepository";
import IChartRepository from "../src/repository/IChartRepository";
import ChartService from "../src/service/ChartService";
import IChartService from "../src/service/IChartService";

let chartRepository: IChartRepository;
let chartService: IChartService;

beforeEach(() => {
  chartRepository = new ChartRepository();
  chartService = new ChartService(chartRepository);
  chartService.createDepthChartForPosition("QB");
  chartService.createDepthChartForPosition("WR");
  chartService.createDepthChartForPosition("RB");
  chartService.createDepthChartForPosition("TE");
  chartService.createDepthChartForPosition("K");
  chartService.createDepthChartForPosition("P");
  chartService.createDepthChartForPosition("KR");
  chartService.createDepthChartForPosition("PR");
});

describe("Player Addition tests", () => {
  test("Adding a quarterback", () => {
    let quarterback: Player = new Player(0, "quarterback");
    chartService.addPlayerToDepthChart(quarterback, "QB", 0);
    expect(chartRepository.charts.depthCharts.get("QB").length).toBe(1);
    expect(chartRepository.charts.depthCharts.get("QB")[0]).toBe(0);
  });

  test("Adding two quarterbacks to the same position", () => {
    let quarterback: Player = new Player(0, "quarterback");
    let quarterback2: Player = new Player(1, "quarterback2");
    chartService.addPlayerToDepthChart(quarterback, "QB", 0);
    chartService.addPlayerToDepthChart(quarterback2, "QB", 0);
    expect(chartRepository.charts.depthCharts.get("QB").length).toBe(2);
    expect(chartRepository.charts.depthCharts.get("QB")[0]).toBe(1);
    expect(chartRepository.charts.depthCharts.get("QB")[1]).toBe(0);
  });
  test("Adding a quarterback and a wide receiver", () => {
    let quarterback: Player = new Player(0, "quarterback");
    let wideReceiver: Player = new Player(1, "wideReceiver");
    chartService.addPlayerToDepthChart(quarterback, "QB", 0);
    chartService.addPlayerToDepthChart(wideReceiver, "WR", 0);
    expect(chartRepository.charts.depthCharts.get("QB").length).toBe(1);
    expect(chartRepository.charts.depthCharts.get("QB")[0]).toBe(0);

    expect(chartRepository.charts.depthCharts.get("WR").length).toBe(1);
    expect(chartRepository.charts.depthCharts.get("WR")[0]).toBe(1);
  });
});

describe("Player Removal tests", () => {
  beforeEach(()=>{
    let quarterback: Player = new Player(0, "quarterback");
    chartService.addPlayerToDepthChart(quarterback,"QB",0);
  }),
  test("Removing a player ", () => {
    let quarterback: Player = new Player(0, "quarterback");
    chartService.removePlayerFromDepthChart(quarterback, "QB");
    expect(chartRepository.charts.depthCharts.get("QB").length).toBe(0);
  }),
  describe("Removing a player when multiple exist", ()=>{
    beforeEach(()=>{
      let quarterback: Player = new Player(0, "quarterBack");
      let quarterback2 : Player = new Player(1,"quarterback2");
      chartService.addPlayerToDepthChart(quarterback2,"QB",1);
    }),
    test("Removing a player when multiple players exist should return ", () => {
      let quarterback: Player = new Player(0, "quarterBack");
      chartService.removePlayerFromDepthChart(quarterback, "QB");
      expect(chartRepository.charts.depthCharts.get("QB").length).toBe(1);
      expect(chartRepository.charts.depthCharts.get("QB")[0]).toBe(1);
    });
  })
  
});

describe("Chart retrieval tests", () => {
  beforeEach(()=>{
    let quarterback : Player = new Player(0, "quarterback");
    let wideReceiver : Player = new Player(1,"wideReceiver");
    let wideReceiver2 : Player = new Player(2,"wideReceiver2");
    let wideReceiver3 : Player = new Player(3,"wideReceiver3");
    chartService.addPlayerToDepthChart(quarterback,"QB",0);
    chartService.addPlayerToDepthChart(wideReceiver,"WR",0);
    chartService.addPlayerToDepthChart(wideReceiver2,"WR",0);
    chartService.addPlayerToDepthChart(wideReceiver3,"WR",0);
  }),
  test("Get the full depth chart", () => {

    let depthChart = chartService.getFullDepthChart();
    expect(depthChart.get("QB").length).toBe(1)
    expect(depthChart.get("QB")[0]).toBe(0)

    expect(depthChart.get("WR").length).toBe(3)
    expect(depthChart.get("WR")[0]).toBe(3)
    expect(depthChart.get("WR")[1]).toBe(2)
    expect(depthChart.get("WR")[2]).toBe(1)
    
    expect(depthChart.get("RB").length).toBe(0)
    expect(depthChart.get("TE").length).toBe(0)
  });

  test("Get players underneath a player", () => {
    let wideReceiver3: Player = new Player(3,"wideReceiver3");
    let depthChart = chartService.getPlayersUnderPlayerInDepthChart(wideReceiver3,"WR");
    expect(depthChart).toEqual([2,1])
  });

  test("Get no players under a player", () => {
    let wideReceiver: Player = new Player(1,"wideReceiver");
    let depthChart = chartService.getPlayersUnderPlayerInDepthChart(wideReceiver,"WR");
    expect(depthChart).toEqual([])
    expect(depthChart.length).toEqual(0)
  });
});
