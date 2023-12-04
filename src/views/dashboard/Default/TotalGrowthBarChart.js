import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const TotalGrowthBarChart = () => {
  const user_id = localStorage.getItem("user_id")

  const [chartData, setChartData] = useState({
    options: {
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top' // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => Number(val).toLocaleString(),
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: {
        categories: [],
        position: 'bottom',
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
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
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
          shade: 'light',
          type: 'horizontal',
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
          formatter: (val) => Number(val).toLocaleString()
        }
      },
      title: {
        text: '',
        floating: true,
        offsetY: 0,
        align: 'left',
        style: {
          color: '#444'
        }
      },
      chart: {
        animations: {
          enabled: false
        },
        background: '#fff'
      }
    },
    series: [
      {
        data: []
      },
      {
        data: []
      }
    ]
  });

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.post(`${process.env.REACT_APP_AUTOMATE}/dashboardchart`, { user_id });
      const Negative_Test_Cases_List = response1.data.map((d) => d.Negative_Test_Cases);
      const Passes_Test_Cases = response1.data.map((d) => d.Passes_Test_Cases);
      const dates = response1.data.map((d) => d.Day);

      setChartData({
        options: {
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top' // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => Number(val).toLocaleString(),
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#304758']
            }
          },
          xaxis: {
            categories: [...dates],
            position: 'bottom',
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
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
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
              shade: 'light',
              type: 'horizontal',
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
              formatter: (val) => Number(val).toLocaleString()
            }
          },
          title: {
            text: 'Performance Test Chart',
            floating: true,
            offsetY: 0,
            align: 'left',
            style: {
              color: '#444'
            }
          },
          chart: {
            animations: {
              enabled: false
            },
            background: '#fff'
          }
        },
        series: [
          {
            name: 'Number of Failed Test Cases',
            data: [...Negative_Test_Cases_List]
          },
          { name: 'Number of Passed Test Cases', data: [...Passes_Test_Cases] }
        ]
      });
    }
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height="300" />
    </div>
  );
};

export default TotalGrowthBarChart;
