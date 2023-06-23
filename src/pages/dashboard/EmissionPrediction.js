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
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME LINE CHART ||============================== //

const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const EmissionPrediction = ({ slot, history }) => {
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(lineChartOptions);
    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const majorKeys = ['total_emission', 'IF', 'STI', 'MIF'];
        const result = {};
        majorKeys.forEach((key) => {
            result[key] = history.map((entry) => entry[key]);
        });

        let finalData, finalDate;
        if (slot == 'day') {
            finalData = result;
            finalDate = history.map((entry) => longFormattedDate(entry['date']));
        } else {
            finalData = {};
            majorKeys.forEach((x) => {
                let agg = history.reduce((result, item) => {
                    const date = new Date(item.date);
                    const year = date.getFullYear();
                    const month = date.getMonth(); // Months are zero-based, so add 1

                    const key = `${monthMap[month]} ${year}`;
                    if (!result[key]) {
                        result[key] = 0;
                    }
                    result[key] += item[x];
                    return result;
                }, {});
                finalData[x] = Object.values(agg);
                finalDate = Object.keys(agg);
            });
        }

        const finalSeries = Object.keys(finalData).map((key) => ({
            name: key,
            data: finalData[key]
        }));

        setSeries(finalSeries);
        setCategories(finalDate);
    }, [history, slot]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.secondary.dark, theme.palette.primary.main, theme.palette.primary[900], theme.palette.primary.light],
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
            yaxis: {
                labels: {
                    formatter: (value) => `${value && value.toFixed(2)} kg CO2e`,
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
    }, [primary, secondary, line, theme, categories, slot]);

    return <ReactApexChart options={options} series={series} type="line" height={450} />;
};

EmissionPrediction.propTypes = {
    slot: PropTypes.string,
    history: PropTypes.array
};

export default EmissionPrediction;
