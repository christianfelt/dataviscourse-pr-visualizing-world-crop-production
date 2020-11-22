class LineChart {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
        this.cropVis.lineChart = this;
        this.margin = { top: 15, right: 15, bottom: 20, left: 30 };
        this.width = 700 - this.margin.left - this.margin.right;
        this.height = 330 - this.margin.top - this.margin.bottom;
        this.yearScale = d3.scaleLinear().domain([1961, 2014]).range([this.margin.right, this.width - this.margin.left - this.margin.right]);
    }
    drawLineChart() {
        let that = this;
        let lineChartWrapper = d3.select("#line_chart_wrapper");
        lineChartWrapper.append("svg")
            .attr("id", "line_chart_svg");
        // Create x axis
        let yearAxisScale = d3.scaleLinear().domain([1961, 2014]).range([that.margin.left, that.width]).nice();
        let yearAxis = d3.axisBottom().scale(yearAxisScale).tickFormat(d3.format("d"));
        d3.select("#line_chart_svg")
            .append("g")
            .attr("id", "yearAxis")
            .attr("transform", "translate(0," + (that.height + that.margin.top) + ")")
            .call(yearAxis);
    }
    deleteLineChart() {
        d3.select("#line_chart_group").remove();
        d3.select("#lineUnitsKey").remove();
        d3.select("#lineChartYAxis").remove();
    }
    updateLineChart() {
        let that = this;
        that.deleteLineChart();
        // Find the max production for the selected crop over all years
        let years = that.data.max_element_vals_for_each_crop[that.cropVis.selected_crop]["Production"];
        let cropElementMax = 0;
        for (let year in years) {
            let thisValue = +years[year];
            if (thisValue > cropElementMax) {
                cropElementMax = thisValue;
            }
        }
        let valueScale = d3.scaleLinear().domain([0, cropElementMax]).range([that.height, that.margin.top]);

        // Create y axis
        let unitCompressionFactor = (10 ** (String(Math.trunc(cropElementMax)).length - 1));
        let yAxisScale = d3.scaleLinear().domain([0, cropElementMax]).range([that.height, that.margin.top]).nice();
        let yAxis = d3.axisLeft().scale(yAxisScale).tickFormat(function (d) {
            return d / (unitCompressionFactor);
        });
        d3.select("#line_chart_svg")
            .append("g")
            .attr("id", "lineChartYAxis")
            .attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")")
            .call(yAxis);
        d3.select("#line_chart_svg")
            .append("text")
            .text("Units: " + unitCompressionFactor.toExponential() + " tonnes")
            .attr("x", that.margin.left)
            .attr("y", that.margin.top + 10)
            .attr("id", "lineUnitsKey");

        //Prepare data to bind
        let selected_countries_data = {};
        for (let c of that.cropVis.selected_countries) {
            selected_countries_data[c] = that.data.countries[c];
        }
        let year_data = {};
        for (let c in selected_countries_data) {
            year_data[c] = [];
            for (let year = 1961; year <= 2014; year++) {
                let value = selected_countries_data[c][that.cropVis.selected_crop]["Production"]["y" + String(year)];
                if (value == "") {
                    value = 0;
                }
                else if (Number.isNaN(value)) {
                    console.log(value);
                }
                year_data[c].push([year, value]);
            }
        }
        let lineChartSVG = d3.select("#line_chart_svg")
            .append("g")
            .attr("id", "line_chart_group")
            .attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");
        let i = 1;
        for (let c in year_data) {
            lineChartSVG.append("path")
                .datum(year_data[c])
                .attr("d", d3.line()
                    .x(function (d) {
                        let x = that.yearScale(d[0]);
                        if (Number.isNaN(x) || x == undefined) {
                            return that.yearScale(1961);
                        }
                        else {
                            return x;
                        }
                    })
                    .y(function (d) {
                        let y = valueScale(d[1]);
                        if (Number.isNaN(y) || y == undefined) {
                            return valueScale(0);
                        }
                        else {
                            return y;
                        }
                    })
                )
                .classed("line", true)
                .style("stroke", function () {
                    return that.cropVis.worldMap.selectedCountryColorScheme(i);
                });
            i++;
        }



    }
    drawYearBar() {
        let that = this;
        let yearSlider = d3.select('#year_slider_wrapper')
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 1961)
            .attr('max', 2014)
            .attr('value', that.cropVis.active_year);

        let sliderLabelSVG = d3.select('#year_slider_wrapper')
            .append('div').classed('slider_label', true)
            .append('svg').attr("id", "slider_SVG");

        let sliderText = sliderLabelSVG.append('text')
            .attr("id", "slider_label_text")
            .text(that.cropVis.active_year)
            .attr("x", 5)
            .attr("y", 15);

        yearSlider.on('input', function () {
            let thisYear = this.value;
            that.cropVis.active_year = thisYear;
            sliderText.text(thisYear);
            that.cropVis.barChart.updateBarChart();
            that.cropVis.cropList.updateCropOnMap(that);

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