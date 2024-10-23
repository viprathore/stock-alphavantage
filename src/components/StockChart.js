import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Header from './Header';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = ({ stockData }) => {
    if (!stockData || !stockData["Meta Data"] || !stockData["Time Series (5min)"]) {
        return <div className="text-center text-red-500">No stock data available</div>;
    }

    const { "Meta Data": metaData, "Time Series (5min)": timeSeries } = stockData;

    const timeLabels = Object.keys(timeSeries).reverse().map(time => moment(time).format('HH:mm'));

    const closingPrices = timeLabels.map((_, index) => {
        const key = Object.keys(timeSeries).reverse()[index];
        return timeSeries[key]["4. close"];
    });

    const chartData = {
        labels: timeLabels,
        datasets: [
            {
                label: `Closing Prices for ${metaData["2. Symbol"]}`,
                data: closingPrices,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Stock Prices',
            },
        },
    };

    return (
        <div className="container mx-auto p-4">
            <Header metaData={metaData} />
            <h2 className="text-xl font-bold mb-4">Stock Chart: {metaData["2. Symbol"]}</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default StockChart;
