import React, { useEffect, useState } from 'react';
import StockTable from './StockTable';
import StockChart from './StockChart';
import Imp from '../BasicImport';

const StockTab = () => {
    const [activeTab, setActiveTab] = useState('table');
    const [loading, setLoading] = useState(false);
    const [stockData, setStockData] = useState(null);
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        setLoading(true);
        Imp.Util.call_get_with_uri_param(Imp.constants.TIME_SERIES_INTRADAY, (data, status) => {
            if (status) {
                console.log(status, data);
                setLoading(false);
                setStockData(data);
            } else {
                console.log(status, data);
            }
        })
    }
    return (
        <div className="container mx-auto p-4">
            {loading ? <div className="text-2xl text-center text-black h-[500px] flex items-center justify-center">Loading...</div> : <>
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                        <ul className="flex flex-wrap -mb-px justify-center">
                            <li className="me-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'table' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} rounded-t-lg transition-colors duration-300`}
                                    onClick={() => setActiveTab('table')}
                                >
                                    Table View
                                </button>
                            </li>
                            <li className="me-2">
                                <button
                                    className={`inline-block p-4 border-b-2 ${activeTab === 'chart' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} rounded-t-lg transition-colors duration-300`}
                                    onClick={() => setActiveTab('chart')}
                                >
                                    Chart View
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="transition duration-500 ease-in-out">
                    {activeTab === 'table' && <StockTable stockData={stockData} />}
                    {activeTab === 'chart' && <StockChart stockData={stockData} />}
                </div>
            </>}
        </div>
    );
};

export default StockTab;
