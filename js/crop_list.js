class CropList {
    constructor(data) {
        this.data = data;
    }
    drawCropList() {
        let boundCrops = d3.select("#crop_list_ul")
            .selectAll("li")
            .data(this.data.africa);
        boundCrops.enter()
            .append("li")
            .text(function (d) {
                return d.item;
            });
    }
}