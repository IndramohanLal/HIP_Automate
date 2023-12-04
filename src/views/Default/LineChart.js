import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  const chartData = {
    series: [
      {
        name: "This week",
        data: [10, 41, 35, 51, 49, 62, 69],
      },
      {
        name: "Last week",
        data: [20, 31, 28, 41, 59, 52, 59]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        background: '#fff',
      },

      dataLabels: {
        enabled: false
      },
      markers: {
        size: 4,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      title: {
        text: 'Performance Line Chart',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={250} />
    </div>
  );
};

export default LineChart;
