import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const TotalGrowthBarChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => Number(val).toLocaleString() + "$",
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ],
        position: "bottom",
        labels: {
          offsetY: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs_: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: false,
          offsetY: -35
        }
      },
      fill: {
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: (val) => Number(val).toLocaleString() + "$"
        }
      },
      title: {
        text: "Market Overview",
        floating: true,
        offsetY: 0,
        align: "left",
        style: {
          color: "#444"
        }
      },
      chart: {
        animations: {
          enabled: false
        },
        background: "#fff",
      }
    },
    series: [
      {
        name: "Chiffre d'affaires",
        data: [8976, 12987, 9853, 10986, 3571, 8976, 12987, 9853, 10986, 3571, 8976, 12987]
      }
    ]
  });

  useEffect(() => {
    // Simulate data update after 4 seconds
    setTimeout(() => {
      setChartData({
        ...chartData,
        series: [
          {
            name: "Chiffre d'affaires",
            data: [8976, 12987, 9853, 10986, 3571, 8976, 12987, 9853, 10986, 3571, 8976, 12987]
          }
        ]
      });
    }, 4000);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="300"
      />
    </div>
  );
};

export default TotalGrowthBarChart
