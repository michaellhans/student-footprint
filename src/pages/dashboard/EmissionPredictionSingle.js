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

const EmissionPredictionSingle = ({ slot, history }) => {
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(lineChartOptions);
    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Extract list of total emission
        console.log(history);
        const totalEmissionList = history.map((item) => item.total_emission);

        // Extract list of dates
        const dateList = history.map((item) => item.date);

        let finalData, finalDate;
        if (slot == 'week') {
            finalData = totalEmissionList;
            finalDate = dateList;
        } else {
            const agg = history.reduce((result, item) => {
                const date = new Date(item.date);
                const year = date.getFullYear();
                const month = date.getMonth(); // Months are zero-based, so add 1

                const key = `${monthMap[month]} ${year}`;
                if (!result[key]) {
                    result[key] = 0;
                }
                result[key] += item.total_emission;
                console.log(result);
                return result;
            }, {});
            console.log(agg);
            finalData = Object.values(agg);
            finalDate = Object.keys(agg);
        }

        setSeries([
            {
                name: 'Carbon Emission',
                data: finalData
            }
        ]);
        setCategories(finalDate);
    }, [history, slot]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.secondary.main],
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
    }, [primary, secondary, line, theme, categories, slot]);

    return <ReactApexChart options={options} series={series} type="line" height={450} />;
};

EmissionPredictionSingle.propTypes = {
    slot: PropTypes.string,
    history: PropTypes.array
};

export default EmissionPredictionSingle;
