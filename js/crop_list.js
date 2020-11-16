class CropList {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
        this.cropVis.cropList = this;
    }
    updateCropOnMap(that) {
        let choroplethResolution = 9;
        let cropElementMax =
            that.data.max_element_vals_for_each_crop[that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)];
        let choroplethDomain = [];
        for (let i = 0; i < choroplethResolution; i++) {
            choroplethDomain.push(i * (cropElementMax / choroplethResolution));
        }
        let colorScale = d3.scaleThreshold()
            .domain(choroplethDomain)
            .range(d3.schemeBlues[choroplethResolution]);

        d3.selectAll(".boundary")
            .style("fill", function (d) {
                let countryName = that.data.iso_countryName_map[d3.select(this).attr("id")];
                let country = that.data.countries[countryName];
                if (country != undefined) { // There are some I just don't have data for, e.g. Greenland, Kosovo
                    let production = country[that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)];
                    return colorScale(production);
                }
            });
    }
    drawCropList() {
        let that = this;
        let boundCrops = d3.select("#crop_list_ul")
            .selectAll("li")
            .data([...this.data.crops]);
        boundCrops.enter()
            .append("li")
            .attr("id", function(d){
                return d;
            })
            .on("click", function (d) {
                that.cropVis.selected_crop = d;
                that.updateCropOnMap(that);
                // Unhighlight previously selected crop and highlight selected crop
                d3.selectAll(".clickedCropLi").classed("clickedCropLi", false);
                d3.select(this).attr("class", "clickedCropLi");
                that.cropVis.selected_countries.clear();
                that.cropVis.barChart.deleteBarChart();
                that.cropVis.worldMap.clearHighlightedBoundaries();
                that.cropVis.lineChart.deleteLineChart();
            })
            .text(function (d) {
                return d;
            });
    }
}