class Map {
    constructor(data) {
        this.projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        // this.nameArray = data.population.map(d => d.geo.toUpperCase());
        // this.populationData = data.population;
        // this.infoBox = infoBox;
    }
    drawMap(world) {
        let geoJSON = topojson.feature(world, world.objects.countries);
        let mapChart = d3.select("#map_div");
        let mapChartSVG = mapChart.append("svg").attr("id", "map_SVG");
        let path = d3.geoPath().projection(this.projection);
        // let regions = this.populationData.map(row => row.region);
        // let ids = this.populationData.map(row => row.geo.toUpperCase());
        // let regions_and_ids = {};
        // for (let i = 0; i < this.populationData.length; i++) {
        //     let this_id = ids[i];
        //     let this_region = regions[i];
        //     regions_and_ids[this_id] = this_region;
        // }
        let that = this;
        mapChartSVG.selectAll("path")
            .data(geoJSON.features)
            .enter()
            .append("path")
            .attr("id", function (d) {
                return d.id;
            })
            .classed("boundary", true)
            // .on("click", function(d){
            //     d3.selectAll(".selected-country").classed("selected-country", false);
            //     d3.select(this).classed("selected-country", true);
            //     let thisRegion = regions_and_ids[d.id];
            //     globalThis.globalActiveCountry = d.id;
            //     d3.selectAll("circle").classed("hidden", true);
            //     d3.selectAll("." + thisRegion).classed("hidden", false);
            //     d3.selectAll("#" + d.id).classed("selected-country", true);
            //     that.infoBox.updateTextDescription(globalThis.globalActiveCountry, globalThis.globalActiveYear);
            // })
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
    }
    
}