import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const TotalGrowthBarChart = () => {
  const user_id = localStorage.getItem("user_id");

  const [selectedFilter, setSelectedFilter] = useState('Last Month'); // Default filter is 'Last Month'

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
        name: 'Number of Failed Test Cases',
        data: []
      },
      {
        name: 'Number of Passed Test Cases',
        data: []
      }
    ]
  });

  const [filteredDates, setFilteredDates] = useState([]); // State to store filtered dates

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.post(`${process.env.REACT_APP_AUTOMATE}/dashboardchart`, { user_id });
      const allData = response1.data;

      // Filter dates based on the selected filter
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      const lastThreeWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 21);
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      const lastThreeMonths = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
      const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

      let startDate;
      switch (selectedFilter) {
        case 'Today':
          startDate = today;
          break;
        case 'Yesterday':
          startDate = yesterday;
          break;
        case 'Last Week':
          startDate = lastWeek;
          break;
        case 'Last 3 Weeks':
          startDate = lastThreeWeeks;
          break;
        case 'Last Month':
          startDate = lastMonth;
          break;
        case 'Last 3 Months':
          startDate = lastThreeMonths;
          break;
        case 'Last Year':
          startDate = lastYear;
          break;
        default:
          startDate = lastMonth; // Default to 'Last Month'
      }

      const filteredDates = allData.filter(entry => new Date(entry.Day) >= startDate);

      const Negative_Test_Cases_List = filteredDates.map((d) => d.Negative_Test_Cases);
      const Passes_Test_Cases = filteredDates.map((d) => d.Passes_Test_Cases);

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
            categories: filteredDates.map((d) => d.Day)
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
            data: Negative_Test_Cases_List
          },
          {
            name: 'Number of Passed Test Cases',
            data: Passes_Test_Cases
          }
        ]
      });

      setFilteredDates(filteredDates);
    }

    fetchData();
  }, [selectedFilter]);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Last Week">Last Week</option>
          <option value="Last 3 Weeks">Last 3 Weeks</option>
          <option value="Last Month">Last Month</option>
          <option value="Last 3 Months">Last 3 Months</option>
          <option value="Last Year">Last Year</option>
        </select>
      </div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height="300" />
      </div>
    </div>
  );
};

export default TotalGrowthBarChart;
