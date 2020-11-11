class CropList {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
    }
    updateCropOnMap(that) {
        d3.selectAll(".boundary")
            .style("fill", function (d) {
                let countryName = that.data.iso_countryName_map[d3.select(this).attr("id")];
                let country = that.data.countries[countryName];
                if (country != undefined) {
                    let production = country[that.cropVis.selected_crop]["Production"]["y" + String(that.cropVis.active_year)];
                    console.log(production);
                    return "blue";
                }
                else{
                    console.log("The following country name is not found:");
                    console.log(countryName);
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
            .on("click", function (d) {
                that.cropVis.selected_crop = d;
                that.updateCropOnMap(that);
            })
            .text(function (d) {
                return d;
            });
    }
}