
// load json data
d3.json("/belly-button-challenge/samples.json").then(function (data){

    // get values for bar chart
    let bar_values = Object.values(data.samples[0].sample_values).slice(0,10).reverse()
    // console.log(bar_values)

    // get labels for bar chart
    let labels = Object.values(data.samples[0].otu_ids).slice(0,10).reverse()
    let bar_labels = []
    for (var i = 0; i < labels.length; i++) {
        bar_labels.push(`OTU ${labels[i]}`)
    }
    // console.log(bar_labels)

    // get hover data for bar chart
    let bar_hover = Object.values(data.samples[0].otu_labels).slice(0,10).reverse()
    // console.log(bar_hover)


    //initialize plot
    function init(){

        let bar_data = [{
            x: bar_values,
            y: bar_labels,
            type: 'bar',
            orientation: 'h'
            // hovertemplate: bar_hover
        }];
        
            Plotly.newPlot('bar', bar_data);
    }


    // call init function
    init()

}) // this is the final bracket of json data

