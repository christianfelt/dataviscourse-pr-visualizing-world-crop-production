class Table {
    constructor(data, cropVis) {
        this.data = data;
        this.cropVis = cropVis;
        this.cropVis.table = this;
        this.nameSortDown = true;
        this.weightSortDown = false;
        this.latestWeights = [];
    }

    deleteTable() {
        d3.selectAll(".tableRow").remove();
    }

    drawTable() {
        let that = this;
        let countryRow = d3.select("#tableBody")
            .selectAll("tr")
            .data(Object.keys(that.data.countries))
            .enter()
            .append("tr")
            .classed("tableRow", true);
        countryRow.append("td").text(function (d, i) {
            return d;
        });
        countryRow.append("td").text(function (d, i) {
            let cropWeight = that.data.countries[d][that.cropVis.selected_crop]["Production"]["y" + that.cropVis.active_year];
            if (cropWeight == "" || cropWeight == undefined) {
                cropWeight = "N/A";
            }
            else {
                cropWeight = Math.round(cropWeight);
            }
            that.latestWeights.push([cropWeight, d]);
            return cropWeight;
        });
        d3.select("#nameHeader").on("click", function () {
            that.nameSortDown = !that.nameSortDown;
            that.redrawNames(that);
        });
        d3.select("#weightHeader").on("click", function () {
            that.weightSortDown = !that.weightSortDown;
            that.redrawWeights(that);
        });
    }

    redrawNames(that) {
        that.deleteTable();
        let sortedByNames = that.latestWeights.sort(function (a, b) {
            let returnValue = 0;
            if (that.nameSortDown) {
                if (a[1] > b[1]) {
                    returnValue = 1;
                }
                else {
                    returnValue = -1;
                }
            }
            else {
                if (b[1] > a[1]) {
                    returnValue = 1;
                }
                else {
                    returnValue = -1;
                }
            }
            return returnValue;
        });
        let countryRow = d3.select("#tableBody")
            .selectAll("tr")
            .data(sortedByNames)
            .enter()
            .append("tr")
            .classed("tableRow", true);
        countryRow.append("td").text(function (d, i) {
            return d[1];
        });
        countryRow.append("td").text(function (d, i) {
            return d[0]
        });
    }

    redrawWeights(that) {

        function weightMap(weight) {
            if (weight == "N/A" && that.weightSortDown) {
                return Infinity;
            }
            else if (weight == "N/A" && !that.weightSortDown){
                return -Infinity; //Put N/As at the bottom in either case
            }
            else {
                return +weight;
            }
        }

        that.deleteTable();
        let sortedByWeight = that.latestWeights.sort(function (a, b) {
            let returnValue = 0;
            if (that.weightSortDown) {
                returnValue = weightMap(a[0]) - weightMap(b[0]);
            }
            else {
                returnValue = weightMap(b[0]) - weightMap(a[0]);
            }
            return returnValue;
        });
        console.log(sortedByWeight);
        let countryRow = d3.select("#tableBody")
            .selectAll("tr")
            .data(sortedByWeight)
            .enter()
            .append("tr")
            .classed("tableRow", true);
        countryRow.append("td").text(function (d, i) {
            return d[1];
        });
        countryRow.append("td").text(function (d, i) {
            return d[0];
        });
    }
}