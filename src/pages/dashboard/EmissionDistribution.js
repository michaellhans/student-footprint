import { useState } from 'react';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const pieChartOptions = {
    chart: {
        width: 380,
        type: 'pie'
    },
    labels: ['Electricity', 'Commuting', 'Paper', 'Laboratory', 'Lifestyle'],
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    ]
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const EmissionDistribution = () => {
    const [series] = useState([44, 55, 13, 43, 22]);
    const [options] = useState(pieChartOptions);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="pie" width={380} />
        </div>
    );
};

export default EmissionDistribution;
