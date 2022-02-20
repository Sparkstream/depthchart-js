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
  chartService.createDepthChartForPosition("SP");
  chartService.createDepthChartForPosition("RP");
  chartService.createDepthChartForPosition("C");
  chartService.createDepthChartForPosition("1B");
  chartService.createDepthChartForPosition("2B");
  chartService.createDepthChartForPosition("3B");
  chartService.createDepthChartForPosition("SS");
  chartService.createDepthChartForPosition("LF");
  chartService.createDepthChartForPosition("RF");
  chartService.createDepthChartForPosition("CF");
  chartService.createDepthChartForPosition("DH");
});


describe("Player Addition tests", () => {
  test("Adding a starting pitcher", () => {
    let startingPitcher: Player = new Player(0, "startingPitcher");
    chartService.addPlayerToDepthChart(startingPitcher, "SP", 0);
    expect(chartRepository.charts.depthCharts.get("SP").length).toBe(1);
    expect(chartRepository.charts.depthCharts.get("SP")[0]).toBe(0);
  });

  test("Adding two starting pitchers to the same position", () => {
    let startingPitcher: Player = new Player(0, "startingPitcher");
    let startingPitcher2: Player = new Player(1, "startingPitcher2");
    chartService.addPlayerToDepthChart(startingPitcher, "SP", 0);
    chartService.addPlayerToDepthChart(startingPitcher2, "SP", 0);
    expect(chartRepository.charts.depthCharts.get("SP").length).toBe(2);
    expect(chartRepository.charts.depthCharts.get("SP")[0]).toBe(1);
    expect(chartRepository.charts.depthCharts.get("SP")[1]).toBe(0);
  });
  test("Adding a starting pitchers and a relief pitcher", () => {
    let startingPitcher: Player = new Player(0, "startingPitcher");
    let reliefPitcher: Player = new Player(1, "reliefPitcher");
    chartService.addPlayerToDepthChart(startingPitcher, "SP", 0);
    chartService.addPlayerToDepthChart(reliefPitcher, "RP", 0);
    expect(chartRepository.charts.depthCharts.get("SP").length).toBe(1);
    expect(chartRepository.charts.depthCharts.get("SP")[0]).toBe(0);

    expect(chartRepository.charts.depthCharts.get("RP").length).toBe(1);
    expect(chartRepository.charts.depthCharts.get("RP")[0]).toBe(1);
  });
});

describe("Player Removal tests", () => {
  beforeEach(()=>{
    let startingPitcher: Player = new Player(0, "startingPitcher");
    chartService.addPlayerToDepthChart(startingPitcher,"SP",0);
  }),
  test("Removing a player ", () => {
    let startingPitcher: Player = new Player(0, "startingPitcher");
    chartService.removePlayerFromDepthChart(startingPitcher, "SP");
    expect(chartRepository.charts.depthCharts.get("SP").length).toBe(0);
  }),
  describe("Removing a player when multiple exist", ()=>{
    beforeEach(()=>{
      let startingPitcher: Player = new Player(0, "startingPitcher");
      let startingPitcher2 : Player = new Player(1,"startingPitcher2");
      chartService.addPlayerToDepthChart(startingPitcher2,"SP",1);
    }),
    test("Removing a player when multiple players exist should return ", () => {
      let startingPitcher: Player = new Player(0, "startingPitcher");
      chartService.removePlayerFromDepthChart(startingPitcher, "SP");
      expect(chartRepository.charts.depthCharts.get("SP").length).toBe(1);
      expect(chartRepository.charts.depthCharts.get("SP")[0]).toBe(1);
    });
  })
  
});

describe("Chart retrieval tests", () => {
  beforeEach(()=>{
    let startingPitcher : Player = new Player(0, "startingPitcher");
    let reliefPitcher : Player = new Player(1,"reliefPitcher");
    let reliefPitcher2 : Player = new Player(2,"reliefPitcher2");
    let reliefPitcher3 : Player = new Player(3,"reliefPitcher3");
    chartService.addPlayerToDepthChart(startingPitcher,"SP",0);
    chartService.addPlayerToDepthChart(reliefPitcher,"RP",0);
    chartService.addPlayerToDepthChart(reliefPitcher2,"RP",0);
    chartService.addPlayerToDepthChart(reliefPitcher3,"RP",0);
  }),
  test("Get the full depth chart", () => {

    let depthChart = chartService.getFullDepthChart();
    expect(depthChart.get("SP").length).toBe(1)
    expect(depthChart.get("SP")[0]).toBe(0)

    expect(depthChart.get("RP").length).toBe(3)
    expect(depthChart.get("RP")[0]).toBe(3)
    expect(depthChart.get("RP")[1]).toBe(2)
    expect(depthChart.get("RP")[2]).toBe(1)
    
    expect(depthChart.get("C").length).toBe(0)
    expect(depthChart.get("1B").length).toBe(0)
  });

  test("Get players underneath a player", () => {
    let reliefPitcher3: Player = new Player(3,"reliefPitcher3");
    let depthChart = chartService.getPlayersUnderPlayerInDepthChart(reliefPitcher3,"RP");
    expect(depthChart).toEqual([2,1])
  });

  test("Get no players under a player", () => {
    let reliefPitcher: Player = new Player(1,"reliefPitcher");
    let depthChart = chartService.getPlayersUnderPlayerInDepthChart(reliefPitcher,"RP");
    expect(depthChart).toEqual([])
    expect(depthChart.length).toEqual(0)
  });
});