import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const lineChartOptions = {
    chart: {
        height: 450,
        type: 'line',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME LINE CHART ||============================== //

const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const EmissionPrediction = ({ slot }) => {
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(lineChartOptions);
    const [series, setSeries] = useState([
        {
            name: 'IF',
            data: [0, 86, 28, 115, 48, 210, 136]
        },
        {
            name: 'STI',
            data: [0, 43, 14, 56, 24, 105, 68]
        },
        {
            name: 'MIF',
            data: [0, 70, 33, 105, 28, 150, 106]
        }
    ]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[900], theme.palette.primary.light],
            xaxis: {
                categories:
                    slot === 'month'
                        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary
                        ]
                    }
                },
                axisBorder: {
                    show: true,
                    color: line
                },
                tickAmount: slot === 'month' ? 11 : 7
            },
            forecastDataPoints: {
                count: slot === 'month' ? 4 : 3,
                fillOpacity: 0.5,
                dashArray: 4
            },
            yaxis: {
                labels: {
                    formatter: (value) => `${value.toFixed(2)} kg CO2e`,
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, secondary, line, theme, slot]);

    useEffect(() => {
        setSeries([
            {
                name: 'IF',
                data: slot === 'month' ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42, 109, 100]
            },
            {
                name: 'STI',
                data: slot === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34, 52, 41]
            },
            {
                name: 'MIF',
                data: slot === 'month' ? [100, 50, 140, 25, 50, 26, 16, 35, 55, 42, 43, 31] : [0, 70, 33, 105, 28, 150, 106]
            }
        ]);
    }, [slot]);

    return <ReactApexChart options={options} series={series} type="line" height={450} />;
};

EmissionPrediction.propTypes = {
    slot: PropTypes.string
};

export default EmissionPrediction;
