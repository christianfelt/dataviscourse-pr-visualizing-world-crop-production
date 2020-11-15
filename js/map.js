class Map {
    constructor(data, cropVis) {
        this.projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        this.cropVis = cropVis;
        this.data = data;
        this.cropVis.worldMap = this;
        this.selectedCountryColorScheme = d3.scaleOrdinal(d3.schemeTableau10);
    }
    clearHighlightedBoundaries() {
        d3.selectAll(".boundary").style("stroke", "black");
        d3.selectAll(".boundary").style("stroke-width", "0.3px");
        d3.selectAll(".boundary").style("opacity", "1");
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
                that.cropVis.barChart.updateBarChart();
                that.cropVis.lineChart.updateLineChart();
                let thisSelectionColorIndex = that.cropVis.selected_countries.size;
                d3.select(this).style("stroke", that.selectedCountryColorScheme(thisSelectionColorIndex));
                d3.select(this).style("stroke-opacity", 0.6);
                d3.select(this).style("stroke-width", 4);
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
                // Unhighlight boundaries
                that.clearHighlightedBoundaries();
                that.cropVis.lineChart.deleteLineChart();
            });
    }


}