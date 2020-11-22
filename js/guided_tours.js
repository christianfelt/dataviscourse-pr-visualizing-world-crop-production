class GuidedTours {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
        this.cropVis.guidedTours = this;
        this.almondsString = "In 1961, Spain produced more than twice as many almonds as any other country. Spain's production did not change much overall between 1961 and 2014, but during the same period, almond production in the United States grew dramatically. Around 80% of the world's almonds are now produced in the state of California, and about 70% of California's crop is exported overseas.";
        this.cranberriesString = "98% of the world's cranberries, which flourish in acidic bogs in cool climates, are grown in the United States, Canada, or Chile. Most cranberries are juiced, canned, or sweetened and dried rather than eaten raw. Demand for cranberries in China has recently grown.";
        this.datesString = "There is archaeological evidence of date cultivation in Arabia from the 6th millennium BC. Dates can be made into wine, vinegar, bread, and cakes. The total annual world production of dates amounts to 8.5 million tonnes. Countries of the Middle East and North Africa are the largest producers.";
        this.vanillaString = "Vanilla is produced from the pods of orchids of the genus Vanilla. Vanilla is the second-most expensive spice after saffron because growing the vanilla seed pods is labor intensive. Two thirds of the world's vanilla is grown on Madagascar or Indonesia, although the three major cultivars derive originally from Mesoamerica.";
        this.apricotString = "Apricots were domesticated independently three times in Eurasia, perhaps first in Armenia where they are the national fruit and around 50 different varieties are grown. Throughout most of the last 50 years, Turkey has produced the most apricots, but recently Uzbekistan's production has risen sharply to overtake it.";
        this.gooseberriesString = "Gooseberries include many species of Ribes and other small, sour berries that may be green, red, purple, yellow, white, or black. Gooseberries are indigenous to most parts of Eurasia and some species are extremely cold-hardy, growing as far north as the Arctic Circle.";
        this.peppermintString = "Indigenous to Europe and the Middle East, peppermint is a cross between watermint and spearmint that grows in moist, shady locations. Being a sterile hybrid, it reproduces by sending out runners and is an invasive species in Australia and the US. Peppermint oil is extracted from the leaves and flowering tops. Morocco produces 92% of the world's supply.";
        this.oliveString = "Olives and olive oil have been an important part of Mediterranean cuisine and culture for at least 7,000 years. In 3000 BC, olives were cultivated commercially in Crete, likely providing much of the Minoan civilization's wealth. Raw olives are very bitter and must be cured and fermented prior to eating. Olive tree pollen is extremely allergenic.";
    }

    deleteOverlay() {
        d3.selectAll(".overlay").remove();
    }

    drawGuidedTours() {
        let that = this;
        d3.select("#almondsImg").on("click", function () { that.almondsTour(that) });
        d3.select("#cranberriesImg").on("click", function () { that.cranberriesTour(that) });
        d3.select("#datesImg").on("click", function () { that.datesTour(that) });
        d3.select("#vanillaImg").on("click", function () { that.vanillaTour(that) });
        d3.select("#apricotImg").on("click", function () { that.apricotsTour(that) });
        d3.select("#gooseberryImg").on("click", function () { that.gooseberriesTour(that) });
        d3.select("#peppermintImg").on("click", function () { that.peppermintTour(that) });
        d3.select("#oliveImg").on("click", function () { that.oliveTour(that) });






    }

    almondsTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "almondsOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.almondsString);
        overlay.append("p")
            .classed("overlayTextCitation", true)
            .text("Source: \"Almonds in California\" (Wikipedia)");
        overlay.append("button")
            .attr("type", "button")
            .classed("backButton", true)
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

    cranberriesTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "cranberriesOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.cranberriesString);
        overlay.append("p")
            .classed("overlayTextCitation", true)
            .text("Source: \"Cranberry\" (Wikipedia)");
        overlay.append("button")
            .attr("type", "button")
            .classed("backButton", true)
            .on("click", function () {
                that.deleteOverlay();
            })
            .text("Back");
        let thisLi = document.getElementById("Cranberries");
        that.cropVis.cropList.updateCropSelection("Cranberries", that.cropVis.cropList, thisLi);
        that.cropVis.worldMap.clearHighlightedBoundaries();
        that.cropVis.barChart.deleteBarChart();
        that.cropVis.lineChart.deleteLineChart();
        that.cropVis.selected_countries.clear();
        for (let country of ["USA", "Canada", "Chile", "Belarus"]) {
            that.cropVis.selected_countries.add(country);
            that.cropVis.barChart.updateBarChart();
        }
        that.cropVis.lineChart.updateLineChart();
    }

    datesTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "datesOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.datesString);
        overlay.append("p")
            .classed("overlayTextCitation", true)
            .text("Source: \"Date Palm\" (Wikipedia)");
        overlay.append("button")
            .attr("type", "button")
            .classed("backButton", true)
            .on("click", function () {
                that.deleteOverlay();
            })
            .text("Back");
        let thisLi = document.getElementById("Dates");
        that.cropVis.cropList.updateCropSelection("Dates", that.cropVis.cropList, thisLi);
        that.cropVis.worldMap.clearHighlightedBoundaries();
        that.cropVis.barChart.deleteBarChart();
        that.cropVis.lineChart.deleteLineChart();
        that.cropVis.selected_countries.clear();
        for (let country of ["Egypt", "Iran", "Algeria", "Saudi Arabia", "Iraq", "Pakistan"]) {
            that.cropVis.selected_countries.add(country);
            that.cropVis.barChart.updateBarChart();
        }
        that.cropVis.lineChart.updateLineChart();
    }

    vanillaTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "vanillaOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.vanillaString);
        overlay.append("p")
            .classed("overlayTextCitation", true)
            .text("Source: \"Vanilla\" (Wikipedia)");
        overlay.append("button")
            .attr("type", "button")
            .classed("backButton", true)
            .on("click", function () {
                that.deleteOverlay();
            })
            .text("Back");
        let thisLi = document.getElementById("Vanilla");
        that.cropVis.cropList.updateCropSelection("Vanilla", that.cropVis.cropList, thisLi);
        that.cropVis.worldMap.clearHighlightedBoundaries();
        that.cropVis.barChart.deleteBarChart();
        that.cropVis.lineChart.deleteLineChart();
        that.cropVis.selected_countries.clear();
        for (let country of ["Madagascar", "Indonesia", "Papua New Guinea"]) {
            that.cropVis.selected_countries.add(country);
            that.cropVis.barChart.updateBarChart();
        }
        that.cropVis.lineChart.updateLineChart();
    }

    apricotsTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "apricotsOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.apricotString);
        overlay.append("p")
            .classed("overlayTextCitation", true)
            .text("Source: \"Apricot\" (Wikipedia)");
        overlay.append("button")
            .attr("type", "button")
            .classed("backButton", true)
            .on("click", function () {
                that.deleteOverlay();
            })
            .text("Back");
        let thisLi = document.getElementById("Apricots");
        that.cropVis.cropList.updateCropSelection("Apricots", that.cropVis.cropList, thisLi);
        that.cropVis.worldMap.clearHighlightedBoundaries();
        that.cropVis.barChart.deleteBarChart();
        that.cropVis.lineChart.deleteLineChart();
        that.cropVis.selected_countries.clear();
        for (let country of ["Uzbekistan", "Turkey", "Iran", "Italy", "Algeria"]) {
            that.cropVis.selected_countries.add(country);
            that.cropVis.barChart.updateBarChart();
        }
        that.cropVis.lineChart.updateLineChart();
    }

    gooseberriesTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "gooseberriesOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.gooseberriesString);
        overlay.append("p")
            .classed("overlayTextCitation", true)
            .text("Source: \"Gooseberry\" (Wikipedia)");
        overlay.append("button")
            .attr("type", "button")
            .classed("backButton", true)
            .on("click", function () {
                that.deleteOverlay();
            })
            .text("Back");
        let thisLi = document.getElementById("Gooseberries");
        that.cropVis.cropList.updateCropSelection("Gooseberries", that.cropVis.cropList, thisLi);
        that.cropVis.worldMap.clearHighlightedBoundaries();
        that.cropVis.barChart.deleteBarChart();
        that.cropVis.lineChart.deleteLineChart();
        that.cropVis.selected_countries.clear();
        for (let country of ["Germany", "Russia", "Poland", "Ukraine"]) {
            that.cropVis.selected_countries.add(country);
            that.cropVis.barChart.updateBarChart();
        }
        that.cropVis.lineChart.updateLineChart();
    }

    peppermintTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "peppermintOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.peppermintString);
        overlay.append("p")
            .classed("overlayTextCitation", true)
            .text("Source: \"Peppermint\" (Wikipedia)");
        overlay.append("button")
            .attr("type", "button")
            .classed("backButton", true)
            .on("click", function () {
                that.deleteOverlay();
            })
            .text("Back");
        let thisLi = document.getElementById("Peppermint");
        that.cropVis.cropList.updateCropSelection("Peppermint", that.cropVis.cropList, thisLi);
        that.cropVis.worldMap.clearHighlightedBoundaries();
        that.cropVis.barChart.deleteBarChart();
        that.cropVis.lineChart.deleteLineChart();
        that.cropVis.selected_countries.clear();
        for (let country of ["Morocco", "Argentina"]) {
            that.cropVis.selected_countries.add(country);
            that.cropVis.barChart.updateBarChart();
        }
        that.cropVis.lineChart.updateLineChart();
    }

    oliveTour(that) {
        let overlay = d3.select("#guided_tours_wrapper")
            .append("div")
            .attr("id", "oliveOverlay")
            .classed("overlay", true);
        overlay.append("p")
            .classed("overlayText", true)
            .text(that.oliveString);
        overlay.append("p")
            .classed("overlayTextCitation", true)
            .text("Source: \"Olive\" (Wikipedia)");
        overlay.append("button")
            .attr("type", "button")
            .classed("backButton", true)
            .on("click", function () {
                that.deleteOverlay();
            })
            .text("Back");
        let thisLi = document.getElementById("Olives");
        that.cropVis.cropList.updateCropSelection("Olives", that.cropVis.cropList, thisLi);
        that.cropVis.worldMap.clearHighlightedBoundaries();
        that.cropVis.barChart.deleteBarChart();
        that.cropVis.lineChart.deleteLineChart();
        that.cropVis.selected_countries.clear();
        for (let country of ["Spain", "Italy", "Greece", "Turkey", "Morocco"]) {
            that.cropVis.selected_countries.add(country);
            that.cropVis.barChart.updateBarChart();
        }
        that.cropVis.lineChart.updateLineChart();
    }

    selectPreset(crop, countries, year) {

    }
}