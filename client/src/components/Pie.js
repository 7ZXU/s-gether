import React from 'react';
import { Pie } from 'react-chartjs-2';

function Pchart({start, end, done}) {
  const chartColors = ['#0000FF', '#FF0000', '#999933', '#666699'];

  // 2020년 7월 1일 
const date1 = new Date(start.substring(0,4), start.substring(5,7), start.substring(8,10));
// 2020년 7월 3일 
const date2 = new Date(end.substring(0,4), end.substring(5,7), end.substring(8,10));

let sai = (date2.getTime() - date1.getTime())/ 1000 / 60 / 60 / 24;

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
        data: [done, sai-done], //날짜계산 추가
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
