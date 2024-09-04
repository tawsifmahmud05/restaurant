import { Component, OnInit } from '@angular/core';
import { Colors } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A',


    },
    // {
    //   data: [120, 455, 100, 340],
    //   label: 'Account B'
    // },
    // {
    //   data: [45, 67, 800, 500],
    //   label: 'Account C'
    // }
  ];

  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];

  chartOptions = {
    responsive: true
  };

  // public chart: any;

  ngOnInit(): void {
    // this.createChart();
  }



}
