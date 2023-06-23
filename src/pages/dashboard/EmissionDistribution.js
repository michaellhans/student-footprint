import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// third-party
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

// chart options
function pieChartOptions(labels) {
    return {
        chart: {
            width: 380,
            type: 'pie'
        },
        labels: labels.map((string) => string.charAt(0).toUpperCase() + string.slice(1)),
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
        ],
        tooltip: {
            y: {
                formatter: (value) => `${value.toFixed(0)} kg CO2e`
            }
        }
    };
}

// ==============================|| MONTHLY BAR CHART ||============================== //

const StyledLoading = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
}));

EmissionDistribution.propTypes = {
    distribution: PropTypes.object
};

function EmissionDistribution({ distribution }) {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState(pieChartOptions([]));
    const [isLoading] = useState(false);

    useEffect(() => {
        setSeries(Object.values(distribution));
        setOptions(pieChartOptions(Object.keys(distribution)));
    }, [distribution]);

    return isLoading ? (
        <StyledLoading>
            <CircularProgress color="secondary" />
        </StyledLoading>
    ) : (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="pie" width={380} />
        </div>
    );
}

export default EmissionDistribution;
