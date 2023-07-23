import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { longFormattedDate } from 'utils/format';

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
        width: 2,
        dashArray: [0, 4]
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME LINE CHART ||============================== //

const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const EmissionPredictionSingle = ({ slot, history }) => {
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(lineChartOptions);
    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Extract list of total emission
        const totalEmissionList = history
            .filter((item) => item.hasOwnProperty('total_emission') && item.total_emission !== 0)
            .map((item) => item.total_emission);

        let finalPredicted;
        if (history.length > 0) {
            finalPredicted = history.map((item) => item.predicted_emission);
        }

        // Extract list of dates
        const dateList = history.map((item) => longFormattedDate(item.date));

        let finalData, finalDate;
        if (slot == 'day') {
            finalData = totalEmissionList;
            finalDate = dateList;
        } else {
            let agg = history.reduce((result, item) => {
                const date = new Date(item.date);
                const year = date.getFullYear();
                const month = date.getMonth(); // Months are zero-based, so add 1

                const key = `${monthMap[month]} ${year}`;
                if (!result[key]) {
                    result[key] = 0;
                }
                result[key] += item.total_emission;
                return result;
            }, {});
            finalData = Object.values(agg);
            finalDate = Object.keys(agg);
            if (history.length > 0) {
                agg = history.reduce((result, item) => {
                    const date = new Date(item.date);
                    const year = date.getFullYear();
                    const month = date.getMonth(); // Months are zero-based, so add 1

                    const key = `${monthMap[month]} ${year}`;
                    if (!result[key]) {
                        result[key] = 0;
                    }
                    result[key] += item.predicted_emission;
                    return result;
                }, {});
                finalPredicted = Object.values(agg);
            }
        }

        if (finalPredicted) {
            setSeries([
                {
                    name: 'Real Emission',
                    data: finalData.filter((value) => value !== 0)
                },
                {
                    name: 'Predicted Emission',
                    data: finalPredicted,
                    dashArray: 4
                }
            ]);
        } else {
            setSeries([
                {
                    name: 'Real Emission',
                    data: finalData.filter((value) => value !== 0)
                }
            ]);
        }

        setCategories(finalDate);
    }, [history, slot]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.error.main],
            xaxis: {
                categories: categories,
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
            // forecastDataPoints: {
            //     count: slot === 'month' ? 4 : 3,
            //     fillOpacity: 0.5,
            //     dashArray: 4
            // },
            yaxis: {
                labels: {
                    formatter: (value) => `${value && value.toFixed(2)} kg CO2e`,
                    style: {
                        colors: [secondary]
                    }
                },
                min: 0
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, secondary, line, theme, categories, slot]);

    return <ReactApexChart options={options} series={series} type="line" height={450} />;
};

EmissionPredictionSingle.propTypes = {
    slot: PropTypes.string,
    history: PropTypes.array
};

export default EmissionPredictionSingle;
