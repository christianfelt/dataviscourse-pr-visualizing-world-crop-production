/* Represents the bar chart.*/
class BarChart {
    /* Constructs the bar chart*/
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
        this.cropVis.barChart = this;
        this.maxBarHeight = 300;
        this.leftMargin = 30;
        this.barWidth = 50;
        this.barSpacing = 25;
    }

    /*Draws an empty bar chart.*/
    drawBarChart() {
        let barChartWrapper = d3.select("#bar_chart_wrapper");
        barChartWrapper.append("svg")
            .attr("id", "bar_chart_svg");
    }

    /*Deletes the bar chart.*/
    deleteBarChart() {
        d3.select("#barAxis").remove();
        d3.select("#barUnitsKey").remove();
        d3.selectAll(".barGroup").remove();
    }

    /*Redraws the bar chart for new data.*/
    updateBarChart() {
        let that = this;
        // Option 1: rescale y axis according to max for each year
        // let cropElementMax =
        //     that.data.max_element_vals_for_each_crop[that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)];

        // Option 2: have static y axis with max of all years
        // Find the max production for the selected crop over all years
        let years = that.data.max_element_vals_for_each_crop[that.cropVis.selected_crop]["Production"];
        let cropElementMax = 0;
        for (let year in years) {
            let thisValue = +years[year];
            if (thisValue > cropElementMax) {
                cropElementMax = thisValue;
            }
        }
        let barScale = d3.scaleLinear().domain([0, cropElementMax]).range([0, that.maxBarHeight]).nice();
        let axisScale = d3.scaleLinear().domain([0, cropElementMax]).range([that.maxBarHeight, 0]).nice();
        that.deleteBarChart();
        // For displaying units in scientific notation
        let unitCompressionFactor = (10 ** (String(Math.trunc(cropElementMax)).length - 1));
        let barAxis = d3.axisLeft()
            .scale(axisScale).tickFormat(function (d, i) {
                return d / (unitCompressionFactor);
            });
        d3.select("#bar_chart_svg")
            .append("text")
            .text("Units: " + unitCompressionFactor.toExponential() + " tonnes")
            .attr("x", 30)
            .attr("y", 9)
            .attr("id", "barUnitsKey");
        d3.select("#bar_chart_svg")
            .append("g")
            .attr("transform", "translate(30,10)")
            .attr("id", "barAxis")
            .call(barAxis);
        let rectSelection = d3.select("#bar_chart_svg")
            .selectAll(".barGroup")
            .data([...this.cropVis.selected_countries]) // Unpack set into list so that data can be bound to it
            .enter()
            .append("g")
            .classed("barGroup", true)
            .attr("transform", function (d, i) {
                return "translate(" + (i * (that.barWidth + that.barSpacing) + that.leftMargin) + "," + 10 + ")";
            });
        rectSelection
            .append("text")
            .attr("y", that.maxBarHeight + 15) // Place text under bars
            .classed("barLabel", true)
            .text(d => d);
        rectSelection
            .append("rect")
            .attr("id", d => d.replace(/ /g, "_") + "_rect")
            .attr("x", 0)
            .attr("y", function (d, i) {
                let height = 0;
                try {
                    height = that.data.countries[d][that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)];
                }
                catch { // I don't have data for country d so default to 0
                }
                if (Number.isNaN(height) || height == "" || height == undefined) { // There is no data for this country/crop/element/year combination
                    return 0;
                }
                else {
                    return that.maxBarHeight - barScale(height); // To account for coordinate system starting at top left
                }
            })
            .attr("width", that.barWidth)
            .attr("height", function (d, i) {
                try {
                    return barScale(that.data.countries[d][that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)]);
                }
                catch {
                    return 0;
                }
            })
            .classed("bar", true)
            .style("fill", function (d, i) {
                return that.cropVis.worldMap.selectedCountryColorScheme(i + 1);
            })
            .style("opacity", 0.9)
            .append("title")
            .text(function (d) {
                return Math.round(that.data.countries[d][that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)]) + " tonnes";
            });
    }
}