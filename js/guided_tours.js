class GuidedTours {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
        this.cropVis.guidedTours = this;
    }
    drawGuidedTours() {
        let that = this;
        d3.select("#almondsImg").on("click", d => that.almondsTour(that));
    }
    almondsTour(that){
        d3.select("body").append("div").attr("id", "almondsOverlay").classed("overlay", true);
        let thisLi = document.getElementById("Almonds_with_shell");
        console.log(thisLi);
        that.cropVis.cropList.updateCropSelection("Almonds, with shell", that.cropVis.cropList, thisLi);
    }
    selectPreset(crop, countries, year) {

    }
}