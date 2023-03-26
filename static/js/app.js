
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

    // get values for bubble chart
    let bubble_x = Object.values(data.samples[0].otu_ids)
    let bubble_y = Object.values(data.samples[0].sample_values)
    let bubble_text = Object.values(data.samples[0].otu_labels)
    let bubble_color = []
    for (var i = 0; i < bubble_x.length; i++) {
        if (bubble_x[i] > 3000) {
            bubble_color.push('brown')}
        else if(bubble_x[i] > 2500) {
            bubble_color.push('purple')}
        else if(bubble_x[i] > 2000) {
            bubble_color.push('blue')}
        else if(bubble_x[i] > 1500) {
            bubble_color.push('green')}
        else if(bubble_x[i] > 1000) {
            bubble_color.push('yellow')}
        else if(bubble_x[i] > 500) {
            bubble_color.push('orange')}
        else 
            bubble_color.push('red')
    }
    // console.log(bubble_color)


    // call init function
    init()



    //initialize plots
    function init(){
        console.log(`start init`)
        
        let bar_data = [{
            x: bar_values,
            y: bar_labels,
            type: 'bar',
            orientation: 'h',
            text: bar_hover
        }];
        let bar_layout = {
            title: {
                text: "Subject's top 10 microbial species"},
            xaxis: {
                title: {text: "OTU count"},
                linecolor: 'black',
                mirror: true},
            yaxis: {
                linecolor: 'black',
                mirror: true}
            }


        

        Plotly.newPlot('bar', bar_data, bar_layout);

        console.log(`start bubble init`)
        let bubble_data = [{
            x: bubble_x,
            y: bubble_y,
            marker: {
                size: bubble_y,
                color: bubble_color
            },
            mode: 'markers',
            text: bubble_text
        }]

        let bubble_layout = {
            title: {
                text: "Bubble Chart of results"},
            xaxis: {
                title: {text: "OTU ID"}}

        }
        console.log(bubble_layout)
        Plotly.newPlot('bubble',bubble_data, bubble_layout)
        
        console.log(`start demographic table`)

        // demographic initial data
        let metadata = Object.entries(data.metadata[0])
        let key = Object.keys(data.metadata[0])
        console.log(metadata)
        console.log(key)
        let meta_values = []

        for (const [key, value] of metadata) {
            meta_values.push(`${key}: ${value}`)
        }
        console.log(meta_values)

        let meta_table = document.getElementById("sample-metadata")
        for (var i = 0; i < meta_values.length; i++) {
            let list = document.createElement("p")
            list.setAttribute('id', key[i])
            let listText = document.createTextNode(meta_values[i])
            list.appendChild(listText)
            console.log(list)
            meta_table.appendChild(list)
        }

        console.log(`finish init`)
    }

    // create list for dropdown
    let id_list = Object.values(data.names)
    console.log(`updating dropdown list`)
    let dropdownMenu = document.getElementById("selDataset")
    for (var i = 0; i < id_list.length; i++) {
        let option = document.createElement("option")
        option.setAttribute('value',id_list[i])
        let optionText = document.createTextNode(id_list[i])
        option.appendChild(optionText)
        dropdownMenu.appendChild(option)
    }
    console.log(`finished dropdown list`)


    // call function when new subject is clicked on
    // let menu_value = d3.select("#selDataset")
    // let dataset = menu_value.property("value")
    // console.log(`before function dataset: ${dataset}`)
    d3.select("#selDataset").on('click', optionChanged)
    console.log(`ready for change`)
    

    // Function called by sample changes
    function optionChanged() {
        console.log(`function called`)
        let menu_value = d3.select("#selDataset")
        let dataset = menu_value.property("value");
        console.log(`dataset in function: ${dataset}`)
        // Assign the value of the dropdown menu option to a letiable

        // Initialize an empty array for the sample data
        let sample_bar_values = [];
        let sample_bar_labels = [];
        let sample_bar_hover = [];
       
        for (var i=0; i < dropdownMenu.length; i++){
            // console.log(`i: ${i}`)
            let sample = Object.values(data.samples[i]).slice(0,1)
            // console.log(`sample in loop: ${sample}`)
            // console.log(`dataset in loop: ${dataset}`)
            // console.log(`sample_bar_values(should be empty): ${sample_bar_values}`)

            if (dataset == sample) {
                console.log(`we are equal`)
                let sample_bar_values = Object.values(data.samples[i].sample_values).slice(0,10).reverse()
                
                let sample_labels = Object.values(data.samples[i].otu_ids).slice(0,10).reverse()
                let sample_bar_labels = []
                for (var l = 0; l < labels.length; l++) {
                    sample_bar_labels.push(`OTU ${sample_labels[l]}`)
                }

                let sample_bar_hover = Object.values(data.samples[i].otu_labels).slice(0,10).reverse()

                updatePlotly(sample_bar_values, sample_bar_labels, sample_bar_hover);


                // bubble data
                let sample_bubble_x = Object.values(data.samples[i].otu_ids)
                let sample_bubble_y = Object.values(data.samples[i].sample_values)
                let sample_bubble_text = Object.values(data.samples[i].otu_labels)
                let sample_bubble_color = []
                for (var c = 0; c < sample_bubble_x.length; c++) {
                    if (sample_bubble_x[c] > 3000) {
                        sample_bubble_color.push('brown')}
                    else if(sample_bubble_x[c] > 2500) {
                        sample_bubble_color.push('purple')}
                    else if(sample_bubble_x[c] > 2000) {
                        sample_bubble_color.push('blue')}
                    else if(sample_bubble_x[c] > 1500) {
                        sample_bubble_color.push('green')}
                    else if(sample_bubble_x[c] > 1000) {
                        sample_bubble_color.push('yellow')}
                    else if(sample_bubble_x[c] > 500) {
                        sample_bubble_color.push('orange')}
                    else 
                        sample_bubble_color.push('red')
                }

                updateBubblePlot(sample_bubble_x, sample_bubble_y, sample_bubble_text, sample_bubble_color)

                console.log(`starting metadata`)
                
                // demographic data
                console.log(`${i}`)
                let metadata = Object.entries(data.metadata[i])
                let key = Object.keys(data.metadata[i])
                console.log(metadata)
                console.log(key)
                let meta_values = []

                for (const [key, value] of metadata) {
                    meta_values.push(`${key}: ${value}`)
                }
                console.log(meta_values)

                let meta_table = document.getElementById("sample-metadata")
                console.log(meta_table)
                for (var p = 0; p < meta_values.length; p++) {
                    let Element_Id = (`#${key[p]}`)
                    console.log(Element_Id)
                    let meta_p = d3.select(Element_Id)
                    console.log(meta_p)
                    meta_p.text(meta_values[p])
                }
                console.log(`finished metadata`)
            }
            
        }
        
    }
    console.log(`right before update plotly`)
        

    // Update the restyled plot's values
    function updatePlotly(sample_bar_values, sample_bar_labels, sample_bar_hover) {
    
        console.log(`sample bar values 1: ${sample_bar_values}`)
        console.log(`sample bar labels 1: ${sample_bar_labels}`)
        console.log(`sample bar hover 1: ${sample_bar_hover}`)
    

        Plotly.restyle("bar", "x", [sample_bar_values]);
        Plotly.restyle("bar", "y", [sample_bar_labels]);
        Plotly.restyle("bar", "text", [sample_bar_hover]);
        
    }
    console.log(`right before update bubble plotly`)

    // Update the bubble plot's values
    function updateBubblePlot(sample_bubble_x, sample_bubble_y, sample_bubble_text, sample_bubble_color) {
        // console.log(`bubble update called`)
        // console.log(`bubble_x values: ${sample_bubble_x}`)
        // console.log(`bubble_y values: ${sample_bubble_y}`)
        // console.log(`bubble_text values: ${sample_bubble_text}`)
        // console.log(`bubble_color values: ${sample_bubble_color}`)

        Plotly.restyle("bubble", "x", [sample_bubble_x]);
        Plotly.restyle("bubble", "y", [sample_bubble_y]);
        Plotly.restyle("bubble", "text", [sample_bubble_text]);
        Plotly.restyle("bubble", "marker", [{size: sample_bubble_y, color: sample_bubble_color}])
    }

}) // this is the final bracket of json data

