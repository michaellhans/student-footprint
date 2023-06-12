import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// third-party
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

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
        ]
    };
}

// ==============================|| MONTHLY BAR CHART ||============================== //

const StyledLoading = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
}));

EmissionDistribution.propTypes = {
    id: PropTypes.number
};

function EmissionDistribution({ id }) {
    const student = useSelector((state) => state.student);
    let distribution = student.cf_activity;
    if (id === 1) {
        distribution = student.cf_category;
    } else if (id === 2) {
        distribution = student.cf_in_out;
    }

    const [series, setSeries] = useState(Object.values(distribution) || []);
    const [options, setOptions] = useState(pieChartOptions(Object.keys(distribution) || []));
    const [isLoading] = useState(false);

    useEffect(() => {
        console.log(student.cf_activity);
        if (id === 1) {
            distribution = student.cf_category;
        } else if (id === 2) {
            distribution = student.cf_in_out;
        }
        setSeries(Object.values(distribution));
        setOptions(pieChartOptions(Object.keys(distribution)));
    }, [student]);

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
