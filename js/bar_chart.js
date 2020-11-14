class BarChart {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
    }
    drawBarChart() {
        let barChartWrapper = d3.select("#bar_chart_wrapper");
        barChartWrapper.append("svg")
            .attr("id", "bar_chart_svg");
        // let barScale = d3.scaleLinear().domain([0, 10000]).range([0, 300]);
        // let barAxis = d3.axisLeft()
        //     .scale(barScale);
        // d3.select("#bar_chart_svg")
        //     .append("g")
        //     .attr("id", "barAxis")
        //     .call(barAxis);

    }
}