
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { WeeklyData } from './hooks/useActivityData';

interface ActivityChartProps {
  weeklyData: WeeklyData;
  height: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ weeklyData, height }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // Détruire l'ancien graphique s'il existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: weeklyData.labels,
            datasets: [{
              label: 'Pas quotidiens',
              data: weeklyData.steps,
              backgroundColor: 'rgba(21, 128, 61, 0.7)',
              borderColor: 'rgba(21, 128, 61, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Nombre de pas'
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      // Nettoyer le graphique lors du démontage
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [weeklyData]);
  
  return (
    <div className={`h-${height} mt-6`}>
      <canvas ref={chartRef} height="300"></canvas>
    </div>
  );
};

export default ActivityChart;
