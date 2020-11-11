class GuidedTours {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
    }
    drawGuidedTours() {
        let guidedToursWrapper = d3.select("#guided_tours_wrapper");
        guidedToursWrapper.append("p")
            .attr("id", "guided_tours_heading")
            .text("Guided Tours");
    }
}