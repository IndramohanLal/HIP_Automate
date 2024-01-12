import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const LineChart = (props) => {
  const user_id = localStorage.getItem("user_id");

  const [selectedFilter, setSelectedFilter] = useState('Last Month'); // Default filter is 'Last Month'

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
      // ... (unchanged options)
    }
  });

  const [filteredDates, setFilteredDates] = useState([]); // State to store filtered dates

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.post(`${process.env.REACT_APP_AUTOMATE}/dashboardchart`, { user_id });

      const allData = response1.data;

      // Filter dates based on the selected filter
      const today = new Date();
      const yesterday = new Date(today);
      // yesterday.setDate(today.getDate() - 1);
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
        // case 'Yesterday':
        //   startDate = yesterday;
        //   break;
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
      console.log(filteredDates)

      const Average_API_Response_Times = filteredDates.map((d) => d.Average_API_Response_Time);
      const Average_Code_Generation_Times = filteredDates.map((d) => d.Average_Code_Generation_Time);
      console.log(Average_API_Response_Times)
      console.log(Average_Code_Generation_Times)
      

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
          // ... (unchanged options)
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
            categories: filteredDates.map((d) => d.Day)
          }
        }
        
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
        <ReactApexChart options={dashboardChart.options} series={dashboardChart.series} type="line" height={250} />
      </div>
    </div>
  );
};

export default LineChart;
