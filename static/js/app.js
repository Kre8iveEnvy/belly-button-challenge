// Build the metadata panel
function buildMetadata(sample)
{
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
// get the metadata field   
        let metaData = data.metadata;
// Filter the metadata for the object with the desired sample number
        let resultArray = metaData.filter(sampleObj => sampleObj.id == sample);

        let result = resultArray[0];
// Use d3 to select the panel with id of `#sample-metadata`   
        let PANEL = d3.select("#sample-metadata");

// Use `.html("") to clear any existing metadata       
        PANEL.html("");

// Inside a loop, you will need to use d3 to append new
// tags for each key-value in the filtered metadata.        
        Object.entries(result).forEach(([key, value])=>{
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
        console.log(result);
    });
}

// function that builds the bar chart
function buildBarChart(sample)
{

    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
       
        // Get the samples field
        // Filter the samples for the object with the desired sample number
        // Get the otu_ids, otu_labels, and sample_values
        let sampleData = data.samples;
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        let resultData = result[0];
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        
        // Build a Bar Chart
        // Don't forget to slice and reverse the input data appropriately
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`); 
        let xvalues = sample_values.slice(0, 10);
        let textLables = otu_labels.slice(0,10);
        

        let barChart = {
            y: yticks.reverse(),
            x: xvalues.reverse(),
            text: textLables.reverse(),
            type: "bar",
            orientation: "h" 
        }

        let layout = {
            title: "Top 10 Bacteria Cultures Found",
        };

        Plotly.newPlot("bar", [barChart], layout);

    });
}

// function that builds bubble chart
function buildBubbleChart(sample)
{
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        
        // Get the samples field
        // Filter the samples for the object with the desired sample number
        // Get the otu_ids, otu_labels, and sample_values
        let sampleData = data.samples;
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        let resultData = result[0];
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
      
        // Build a Bubble Chart
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout = {
            title: "Bacteria Cultures per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Number of Bacteria"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
    });
}

// Function to run on page load
// Get the names field
// Use d3 to select the dropdown with id of `#selDataset`
function initialize()
{
    let select = d3.select("#selDataset");

    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        let sampleNames = data.names; 

// Use the list of sample names to populate the select options
// Hint: Inside a loop, you will need to use d3 to append a new
// option for each sample name.
// Get the first sample from the list
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });

        let samp1 = sampleNames[0];

        // Build charts and metadata panel with the first sample
        buildMetadata(samp1);
        buildBarChart(samp1);
        buildBubbleChart(samp1)
    });


}

// Function for event listener
function optionChanged(newSample)
{
    
    buildMetadata(newSample);
    buildBarChart(newSample);
    buildBubbleChart(newSample);
}

// Initialize the dashboard
initialize();