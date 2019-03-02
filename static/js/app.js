 function buildMetadata(sample) {




//   // @TODO: Complete the following function that builds the metadata panel


   var url1 = `/metadata/${sample}`
   d3.json(url1).then(function(data) {
    d3.select("#sample-metadata").html("")
     Object.entries(data).forEach(([key, value])=>{
       d3.select("#sample-metadata").append("li").text(`${key}: ${value}`)

     })
    })
  }
//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.



function buildCharts(sample) {
  var url2 = `/samples/${sample}`;
  d3.json(url2).then(function(data) {
    // @TODO: Build a Bubble Chart using the sample data
    var bubbledata = {
      'x': data.otu_ids,
      'y': data.sample_values,
      'text': data.otu_labels,
     'mode': 'markers',
      'marker': {
        size: data.sample_values,
        color: data.otu_ids
      }
    };
    // var layout = { margin: { t: 250, b:3500 } };
    Plotly.plot("bubble", [bubbledata]);
    
  
    var piedata = {
    'values':  data.sample_values.slice(0,10),
    'labels':  data.otu_ids.slice(0,10),
    'text': data.otu_labels.slice(0,10),
    'type': 'pie',
    'hoverinfo': "text",
    };
    
    
   Plotly.plot("pie", [piedata]);


    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
