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

    return {
        'africa': africa,
        'americas': americas,
        'asia': asia,
        'europe': europe,
        'oceania': oceania,
    };
}

async function main() {
    data = loadData().then(data => {
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