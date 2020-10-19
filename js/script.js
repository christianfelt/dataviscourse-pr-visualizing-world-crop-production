loadData().then(data => {

    // // no country selected by default
    // this.activeCountry = null;
    // // deafult activeYear is 2000
    // this.activeYear = '2000';
    // let that = this;

    console.log(data)

    // ******* TODO: PART 3 *******
    /**
     * Calls the functions of the views that need to react to a newly selected/highlighted country
     *
     * @param countryID the ID object for the newly selected country
     */
    // function updateCountry(countryID) {

    //     that.activeCountry = countryID;

    //     // TODO - your code goes here
    // }

    // ******* TODO: PART 3 *******

    /**
     *  Takes the specified activeYear from the range slider in the GapPlot view.
     *  It takes the value for the activeYear as the parameter. When the range slider is dragged, we have to update the
     *  gap plot and the info box.
     *  @param year the new year we need to set to the other views
     */
    // function updateYear(year) {

    //     //TODO - your code goes here -

    // }
    // Creates the view objects
    // const infoBox = new InfoBox(data);
    // const worldMap = new Map(data, updateCountry);
    // const gapPlot = new GapPlot(data, updateCountry, updateYear, this.activeYear);


    // Initialize gapPlot here.
    //TODO - your code goes here -

    // here we load the map data
    // // d3.json('data/world.json').then(mapData => {

    // //     // ******* TODO: PART I *******
    // //     // You need to pass the world topo data to the drawMap() function as a parameter, along with the starting activeYear.
    // //     //TODO - your code goes here -



    // // });

    // // This clears a selection by listening for a click
    // document.addEventListener("click", function (e) {
    //     updateCountry(null);
    // }, true);
});

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