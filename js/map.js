class Map {
    constructor(data, cropVis) {
        this.projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        this.cropVis = cropVis;
        this.data = data;
    }
    drawMap(world) {
        let geoJSON = topojson.feature(world, world.objects.countries);
        let mapChart = d3.select("#map_div");
        let mapChartSVG = mapChart.append("svg").attr("id", "map_SVG");
        let path = d3.geoPath().projection(this.projection);
        let that = this;
        mapChartSVG.selectAll("path")
            .data(geoJSON.features)
            .enter()
            .append("path")
            .attr("id", function (d) {
                return d.id;
            })
            .classed("boundary", true)
            .on("click", function (d) {
                let this_ISO = d3.select(this).attr("id");
                let countryName = that.data.iso_countryName_map[this_ISO];
                that.cropVis.selected_countries.add(countryName);
                that.updateBarChart();
            })
            .attr("d", path);
        let graticule = d3.geoGraticule();
        mapChartSVG.append('path')
            .datum(graticule)
            .classed("graticule", true)
            .attr('d', path)
            .attr('fill', 'none');
        mapChartSVG.append("path")
            .datum(graticule.outline)
            .classed("graticule_outline", true)
            .attr("d", path);
        let clearSelectionButton = d3.select("#clear_selection_button")
            .on("click", function () {
                that.cropVis.selected_countries.clear();
                d3.selectAll(".barGroup").remove();

            });
    }
    updateBarChart() {
        let maxBarHeight = 300;
        let barWidth = 50;
        let barSpacing = 15;
        let that = this;
        let cropElementMax =
            that.data.max_element_vals_for_each_crop[that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)];
        let barScale = d3.scaleLinear().domain([0, cropElementMax]).range([0, maxBarHeight]);
        // d3.select("#barAxis").scale(barScale);
        let rectSelection = d3.select("#bar_chart_svg")
            .selectAll(".barGroup")
            .data([...this.cropVis.selected_countries]) // Unpack set into list so that data can be bound to it
            .enter()
            .append("g")
            .classed("barGroup", true)
            .attr("transform", function (d, i) {
                return "translate(" + (i * (barWidth + barSpacing)) + "," + 0 + ")";
            });
        rectSelection
            .append("text")
            .attr("y", maxBarHeight + 20) // Place text under bars
            .classed("barLabel", true)
            .text(d => d);
        rectSelection
            .append("rect")
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
                    return maxBarHeight - barScale(height); // To account for coordinate system starting at top left
                }
            })
            .attr("width", barWidth)
            .attr("height", function (d, i) {
                return barScale(that.data.countries[d][that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)]);
            })
            .classed("bar", true);

    }

}