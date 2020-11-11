class BarChart {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
    }
    drawBarChart() {
        let barChartWrapper = d3.select("#bar_chart_wrapper");
        barChartWrapper.append("svg")
            .attr("id", "bar_chart_svg");
    }
}