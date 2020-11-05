class BarChart {
    constructor(data) {
        this.data = data;
    }
    drawBarChart() {
        let barChartWrapper = d3.select("#bar_chart_wrapper");
        barChartWrapper.append("svg")
            .attr("id", "bar_chart_svg");
    }
}