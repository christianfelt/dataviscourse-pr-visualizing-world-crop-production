/* Represents the world map choropleth. */
class Map {
    /* Holds data for the map. */
    constructor(data, cropVis) {
        this.projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        this.cropVis = cropVis;
        this.data = data;
        this.cropVis.worldMap = this;
        this.selectedCountryColorScheme = d3.scaleOrdinal(d3.schemeTableau10);
    }

    /* Clears all the highlighted country boundaries. */
    clearHighlightedBoundaries() {
        d3.selectAll(".boundary").style("stroke", "black");
        d3.selectAll(".boundary").style("stroke-width", "0.3px");
        d3.selectAll(".boundary").style("opacity", "1");
    }

    /* Highlights all the boundaries of all the currently selected countries. */
    highlightBoundariesOfAllSelectedCountries() {
        let i = 1;
        for (let country of this.cropVis.selected_countries) {
            let countryIso = this.data.countryName_iso_map[country];
            let thisCountry = d3.select("#" + countryIso);
            thisCountry.style("stroke", this.selectedCountryColorScheme(i));
            thisCountry.style("stroke-opacity", 0.6);
            thisCountry.style("stroke-width", 4);
            i++;
        }
    }

    /* Updates the tooltips that appear when you mouse over a country. */
    updateAllMapTooltips(that) {
        d3.selectAll(".boundary")
            .selectAll(".mapTooltip")
            .text(function (d) {
                let countryName = that.data.iso_countryName_map[d.id];
                let countryDict = that.data.countries[countryName];
                if (countryDict != undefined) {
                    let amount = Math.round(that.data.countries[countryName][that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)]);
                    return Number.isNaN(amount) ? countryName + ": N/A tonnes" : countryName + ": " + amount + " tonnes";
                }
                else {
                    return countryName + ": N/A tonnes";
                }
            });
    }

    /* Draws the initial uncolored choropleth world map. */
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
                that.cropVis.lineChart.updateLineChart(true);
                let thisSelectionColorIndex = that.cropVis.selected_countries.size;
                d3.select(this).style("stroke", that.selectedCountryColorScheme(thisSelectionColorIndex));
                d3.select(this).style("stroke-opacity", 0.6);
                d3.select(this).style("stroke-width", 4);
            })
            .attr("d", path)
            .append("title")
            .classed("mapTooltip", true)
            .text(function (d) {
                let countryName = that.data.iso_countryName_map[d.id];
                let countryDict = that.data.countries[countryName];
                if (countryDict != undefined) {
                    let amount = Math.round(that.data.countries[countryName][that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)]);
                    return Number.isNaN(amount) ? countryName + ": N/A tonnes" : countryName + ": " + amount + " tonnes";
                }
                else {
                    return countryName + ": N/A tonnes";
                }
            });
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
                that.cropVis.lineChart.alreadyExistingCountries.clear();
            });
    }
}