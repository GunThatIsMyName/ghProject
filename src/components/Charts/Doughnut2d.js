// STEP 1 - Include Dependencies
// Include react
import React from 'react';

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import column2d from 'fusioncharts/fusioncharts.charts';

// Include the theme as fusion
import candy from 'fusioncharts/themes/fusioncharts.theme.candy';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, column2d, candy);

// STEP 3 - Creating the JSON object to store the chart configuration

const Doughnut2d = ({data}) => {
  const chartConfigs = {
    type: 'doughnut2d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type,
    dataSource: {
      // Chart Configuration
      chart: {
        showPercentValues:0,
        caption:"Laungague",
        theme:"candy"
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;


