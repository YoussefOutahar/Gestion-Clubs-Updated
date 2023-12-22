import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexXAxis,
    ApexYAxis,
    ApexGrid,
    ApexPlotOptions,
    ApexFill,
    ApexMarkers,
    ApexResponsive,
} from 'ng-apexcharts';


export interface month {
    value: string;
    viewValue: string;
}

export interface salesOverviewChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    grid: ApexGrid;
    marker: ApexMarkers;
}

export interface yearlyChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    responsive: ApexResponsive;
}

export interface monthlyChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    responsive: ApexResponsive;
}

interface stats {
    id: number;
    time: string;
    color: string;
    title?: string;
    subtext?: string;
    link?: string;
}

export interface productsData {
    id: number;
    imagePath: string;
    uname: string;
    position: string;
    productName: string;
    budget: number;
    priority: string;
}

// ecommerce card
interface productcards {
    id: number;
    imgSrc: string;
    title: string;
    price: string;
    rprice: string;
}