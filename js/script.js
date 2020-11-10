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
        for (let crop of cropSet){
            countriesDict[country][crop] = {};
            for (let element of elementSet){
                countriesDict[country][crop][element] = {};
            }
        }
    }
    // console.log("countriesDict:");
    // console.log(countriesDict);
    let i = 0;
    for (let continent in continents) {
        for (let row of continents[continent]) {
            i += 1;
            // if (i > 1){
            //     break;
            // }
            if (i % 100 == 0){
                console.log("i");
                console.log(i);
            }
            // console.log("row: ");
            // console.log(row);
            let thisCountry = row.area;
            let thisCrop = row.item;
            let thisElement = row.element;
            for (let attribute in row) {
                // console.log("attribute");
                // console.log(attribute);
                try{
                    // console.log("At least I tried");
                    let access1 = countriesDict[thisCountry];
                    let access2 = access1[thisCrop];
                    let access3 = access2[thisElement];
                    let valueToAdd = row[attribute];
                    // console.log(valueToAdd);
                    // console.log(access3);
                    access3[attribute] = valueToAdd;
                    
                    // countriesDict[thisCountry][thisCrop][thisElement][attribute] = row[attribute];
                    // console.log(countriesDict);
                }
                catch(error){
                    console.log("Adding element to dictionary was invalid for row ");
                    console.log(row);
                    console.log(" with attribute");
                    console.log(attribute);
                    console.log(error);
                }
                finally{
                    // console.log("finally");
                }
            }
        }
    }

    function sortObjectByKey (unorderedObject) {
        let orderedObject = {};
        Object.keys(unorderedObject).sort().forEach(function (key) {
            orderedObject[key] = unorderedObject[key];
        });
        return orderedObject;
    }

    let orderedCrops = [...cropSet].sort();
    let orderedCountries = sortObjectByKey(countriesDict);
    console.log("orderedCountries");
    console.log(orderedCountries);
    return { 'crops': orderedCrops, 'countries': orderedCountries };
}

async function main() {
    data = loadData().then(data => {
        console.log(data);
        const worldMap = new Map(data);
        const cropList = new CropList(data);
        const guidedTours = new GuidedTours(data);
        const barChart = new BarChart(data);
        const lineChart = new LineChart(data);
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