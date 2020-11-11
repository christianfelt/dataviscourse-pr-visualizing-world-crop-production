class LineChart {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
    }
    drawLineChart() {
        let lineChartWrapper = d3.select("#line_chart_wrapper");
        lineChartWrapper.append("svg")
            .attr("id", "line_chart_svg");
    }
    drawYearBar(){
        let yearSlider = d3.select('#year_slider_wrapper')
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 1961)
            .attr('max', 2014)
            .attr('value', 2000);

        let sliderLabelSVG = d3.select('#year_slider_wrapper')
            .append('div').classed('slider_label', true)
            .append('svg').attr("id", "slider_SVG");

        let sliderText = sliderLabelSVG.append('text')
        .attr("id", "slider_label_text")
        .text("2000")
        .attr("x", 5)
        .attr("y", 15);

        yearSlider.on('input', function () {
            // let thisYear = this.value;
            // globalActiveYear = thisYear;
            // let thisXIndicator = axisLabelMap[d3.select("#xAxisText").text()];
            // let thisYIndicator = axisLabelMap[d3.select("#yAxisText").text()];
            // sliderText.text(thisYear);
            // d3.select(".activeYear-background").text(thisYear);
            // that.infoBox.updateTextDescription(globalActiveCountry, thisYear);
            // that.updatePlot(thisYear, thisXIndicator, thisYIndicator, globalCurrentCircleSizeIndicator);
        });
    }
}