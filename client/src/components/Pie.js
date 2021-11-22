import React from 'react';
import { Pie } from 'react-chartjs-2';

function Pchart() {
  const chartColors = ['#0000FF', '#FF0000', '#999933', '#666699'];

  const pieOptions = {
    legend: {
      display: false,
      position: 'right',
      legendCallback: function (chart) {
        console.log(chart);
        return [
          <ul>
            <li>z</li>
            <li>zzzz</li>
            <li>ppp</li>
            <li>adasda</li>
          </ul>,
        ];
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ['성공', '실패'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  };
  let chartInstance = null;

  return (
    <div>
      <Pie
        data={data}
        options={pieOptions}
        ref={(input) => {
          chartInstance = input;
        }}
      />
    </div>
  );
}
export default Pchart;
