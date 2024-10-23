import moment from 'moment';
import React from 'react';
import Header from './Header';

const StockTable = ({ stockData }) => {
    if (!stockData || !stockData["Meta Data"] || !stockData["Time Series (5min)"]) {
        return <div className="text-center text-red-500">No stock data available</div>;
    }
    const { "Time Series (5min)": timeSeries, "Meta Data": metaData } = stockData;

    return (
        <div className="container mx-auto p-4">
            <Header metaData={metaData} />
            <table className="min-w-full table-auto bg-white border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2 text-left">S.No</th>
                        <th className="border px-4 py-2 text-left">Date Time</th>
                        <th className="border px-4 py-2 text-left">Open</th>
                        <th className="border px-4 py-2 text-left">High</th>
                        <th className="border px-4 py-2 text-left">Low</th>
                        <th className="border px-4 py-2 text-left">Close</th>
                        <th className="border px-4 py-2 text-left">Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(timeSeries).map((time, i) => (
                        <tr key={time} className='odd:bg-white even:bg-gray-200 border-b'>
                            <td className="border px-4 py-2">{i + 1}</td>
                            <td className="border px-4 py-2">{moment(time).format("MMM DD, YYYY hh:mm A")}</td>
                            <td className="border px-4 py-2">{timeSeries[time]["1. open"]}</td>
                            <td className="border px-4 py-2">{timeSeries[time]["2. high"]}</td>
                            <td className="border px-4 py-2">{timeSeries[time]["3. low"]}</td>
                            <td className="border px-4 py-2">{timeSeries[time]["4. close"]}</td>
                            <td className="border px-4 py-2">{timeSeries[time]["5. volume"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockTable;
