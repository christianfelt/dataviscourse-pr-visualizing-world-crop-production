class GuidedTours {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
        this.cropVis.guidedTours = this;
        this.almondsString = "In 1961, Spain produced more than twice as many almonds as any other country. Spain's production did not change much overall between 1961 and 2014, but during the same period, almond production in the United States grew dramatically. Around 80% of the world's almonds are now produced in the state of California, and about 70% of California's crop is exported overseas.";
    }
    deleteOverlay() {
        d3.selectAll(".overlay").remove();
    }
    drawGuidedTours() {
        let that = this;
        d3.select("#almondsImg").on("click", function () { that.almondsTour(that) });
    }
    almondsTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "almondsOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.almondsString);
        overlay.append("button")
            .attr("type", "button")
            .on("click", function () {
                that.deleteOverlay();
            })
            .text("Back");
        let thisLi = document.getElementById("Almonds_with_shell");
        that.cropVis.cropList.updateCropSelection("Almonds, with shell", that.cropVis.cropList, thisLi);
        that.cropVis.worldMap.clearHighlightedBoundaries();
        that.cropVis.barChart.deleteBarChart();
        that.cropVis.lineChart.deleteLineChart();
        that.cropVis.selected_countries.clear();
        for (let country of ["USA", "Spain", "Australia", "Iran", "Morocco"]) {
            that.cropVis.selected_countries.add(country);
            that.cropVis.barChart.updateBarChart();
        }
        that.cropVis.lineChart.updateLineChart();
    }
    selectPreset(crop, countries, year) {

    }
}