import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const LineChart = (props) => {
  const [dashboardChart, setDashboardChart] = useState({
    series: [
      {
        name: 'Average API Response Times',
        data: []
      },
      {
        name: 'Average Code Generation Times',
        data: []
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        background: '#fff'
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 4
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      title: {
        text: 'Performance Line Chart',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    }
  });

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get('http://127.0.0.1:5000/dashboardchart');
      const Average_API_Response_Times = response1.data.map((d) => d.Total_API_Tests);
      const Average_Code_Generation_Times = response1.data.map((d) => d.Average_Code_Generation_Time);
      const dates = response1.data.map((d) => d.Day);

      setDashboardChart({
        series: [
          {
            name: 'Average API Response Times',
            data: Average_API_Response_Times
          },
          {
            name: 'Average Code Generation Times',
            data: Average_Code_Generation_Times
          }
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            background: '#fff'
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 4
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          title: {
            text: 'Performance Line Chart',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: dates
          }
        }
      });
    }

    fetchData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={dashboardChart.options} series={dashboardChart.series} type="line" height={250} />
    </div>
  );
};

export default LineChart;
