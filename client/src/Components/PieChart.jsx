import React, { useState, useEffect, Suspense } from 'react';
import { Chart } from 'primereact/chart';
import moment from 'moment';

export default function PieChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const currentDate = new Date();

    useEffect(() => {
        const data = {
            labels: [
                moment(currentDate).subtract(5, 'days').format('DD/MM'),
                moment(currentDate).subtract(4, 'days').format('DD/MM'),
                moment(currentDate).subtract(3, 'days').format('DD/MM'),
                moment(currentDate).subtract(2, 'days').format('DD/MM'),
                moment(currentDate).subtract(1, 'days').format('DD/MM'),
                moment(currentDate).format('DD/MM'),
            ],
            datasets: [
                {
                    data: [30, 40, 35, 50, 49, 60],
                    backgroundColor: [
                        '#FF6384',
                        '#4BC0C0',
                        '#FFCE56',
                        '#E7E9ED',
                        '#36A2EB',
                        '#FFCE56',
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#4BC0C0',
                        '#FFCE56',
                        '#E7E9ED',
                        '#36A2EB',
                        '#FFCE56',
                    ],
                }
            ]
        };

        setChartData(data);
        setChartOptions({
            cutoutPercentage: 70,
        });
    }, []);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Chart type="pie" data={chartData} options={chartOptions} />
            </Suspense>   
        </>
    )
}
        