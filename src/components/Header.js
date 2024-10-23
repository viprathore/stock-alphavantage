import React from 'react'

const Header = ({ metaData }) => {
    if (!metaData) {
        return <div className="text-center text-red-500">No stock data available</div>;
    }
    return (
        <div className="container">
            <div className="mb-4 flex flex-wrap">
                <h1 className="text-xl font-bold">Stock Information: {metaData["2. Symbol"]}</h1>
                <div className='w-full'>
                    <p><strong>Interval:</strong> {metaData["4. Interval"]}</p>
                    <p><strong>Time Zone:</strong> {metaData["6. Time Zone"]}</p>
                </div>
                <p><strong>Last Refreshed:</strong> {metaData["3. Last Refreshed"]}</p>
            </div>
        </div>
    )
}

export default Header;
