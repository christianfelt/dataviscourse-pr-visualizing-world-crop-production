class CropVisualization {
    constructor(active_year, selected_countries, selected_crop) {
        this.active_year = active_year;
        this.selected_countries = selected_countries;
        this.selected_crop = selected_crop;
    }
}

async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let africa = await loadFile('data/agriculture-crop-production/data/production_crops_e_africa.csv');
    let americas = await loadFile('data/agriculture-crop-production/data/production_crops_e_americas.csv');
    let asia = await loadFile('data/agriculture-crop-production/data/production_crops_e_asia.csv');
    let europe = await loadFile('data/agriculture-crop-production/data/production_crops_e_europe.csv');
    let oceania = await loadFile('data/agriculture-crop-production/data/production_crops_e_oceania.csv');
    let cmu5 = await loadFile('data/cmu5.csv');
    let iso_countryName_map = {};
    cmu5.map(row => iso_countryName_map[row.geo.toUpperCase()] = row.country);
    let continents = {
        'africa': africa,
        'americas': americas,
        'asia': asia,
        'europe': europe,
        'oceania': oceania,
    };
    let cropSet = new Set();
    let elementSet = new Set();
    let countries = new Set();
    for (let continent in continents) {
        for (let row of continents[continent]) {
            let thisCrop = row.item;
            let thisCountry = row.area;
            let thisElement = row.element;
            cropSet.add(thisCrop);
            countries.add(thisCountry);
            elementSet.add(thisElement);
        }
    }
    let countriesDict = {};
    for (let country of countries) {
        countriesDict[country] = {};
        for (let crop of cropSet) {
            countriesDict[country][crop] = {};
            for (let element of elementSet) {
                countriesDict[country][crop][element] = {};
            }
        }
    }
    for (let continent in continents) {
        for (let row of continents[continent]) {
            let thisCountry = row.area;
            let thisCrop = row.item;
            let thisElement = row.element;
            for (let attribute in row) {
                countriesDict[thisCountry][thisCrop][thisElement][attribute] = row[attribute];
            }
        }
    }

    function sortObjectByKey(unorderedObject) {
        let orderedObject = {};
        Object.keys(unorderedObject).sort().forEach(function (key) {
            orderedObject[key] = unorderedObject[key];
        });
        return orderedObject;
    }

    let orderedCrops = [...cropSet].sort();
    let orderedCountries = sortObjectByKey(countriesDict);
    return { 'crops': orderedCrops, 'countries': orderedCountries, 'iso_countryName_map': iso_countryName_map };
}

async function main() {
    let cropVisualization = new CropVisualization(2000, new Set(), "Bananas"); //Default values
    data = loadData().then(data => {
        console.log(data);
        const worldMap = new Map(data, cropVisualization);
        const cropList = new CropList(data, cropVisualization);
        const guidedTours = new GuidedTours(data, cropVisualization);
        const barChart = new BarChart(data, cropVisualization);
        const lineChart = new LineChart(data, cropVisualization);
        d3.json('data/world.json').then(mapData => {
            worldMap.drawMap(mapData);
        });
        cropList.drawCropList();
        guidedTours.drawGuidedTours();
        barChart.drawBarChart();
        lineChart.drawLineChart();
        lineChart.drawYearBar();
    });
}

main();