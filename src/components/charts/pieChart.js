import React from 'react';
import {Pie} from 'react-chartjs-2';
import './css/charts.css';


function PieChart() {
    
    const state = {
      labels: ['January', 'February', 'March',
               'April', 'May'],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4'
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
          ],
          data: [65, 59, 80, 81, 56]
        }
      ]
    }
    return (
        <div className="general">
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }

  export default PieChart;