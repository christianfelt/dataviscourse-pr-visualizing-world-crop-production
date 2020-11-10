class CropList {
    constructor(data) {
        this.crops = data.crops;
    }
    drawCropList() {
        let boundCrops = d3.select("#crop_list_ul")
            .selectAll("li")
            .data([...this.crops]);
        boundCrops.enter()
            .append("li")
            .text(function (d) {
                return d;
            });
    }
}