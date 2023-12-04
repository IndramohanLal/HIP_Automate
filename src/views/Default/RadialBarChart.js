import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialBarChart = (props) => {
  let title;
  let value;
  let isPercentage = false;

  if (props.visitsData.total_visitors !== undefined) {
    title = "Total Visitors";
    value = parseFloat(props.visitsData.total_visitors);
    isPercentage = true;
  } else {
    title = "Visits per day";
    value = parseFloat(props.visitsData.visits_per_day);
  }

  const chartData = {
    series: [value], // Multiply by 100 if it's a percentage
    options: {
      chart: {
        background: '#fff',
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: '65%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -2,
              show: true,
              color: '#111',
              fontSize: '10px'
            },
            value: {
              formatter: function (val) {
                return isPercentage ? val + '%' : val; // Append '%' for percentages
              },
              color: '#111',
              fontSize: '14px',
              offsetY: 5,
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [title],
    },
  };

  return (
    <div id="card">
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" height={160} />
      </div>
    </div>
  );
};

export default RadialBarChart;
