import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const StatCamembert = ({ labels, data }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };
    const options = {
      cutout: '60%'
    };

    setChartData(chartData);
    setChartOptions(options);
  }, [labels, data]);

  return (
    <div className="card flex justify-content-center">
      <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-5rem" />
    </div>
  );
};

export default StatCamembert;
