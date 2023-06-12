import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

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

const EmissionPredictionSingle = ({ slot }) => {
    const theme = useTheme();
    const studentHistory = useSelector((state) => state.student.cf_history);

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(lineChartOptions);
    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Extract list of total emission
        const totalEmissionList = studentHistory.map((item) => item.total_emission);
        console.log(totalEmissionList);

        // Extract list of dates
        const dateList = studentHistory.map((item) => item.date);
        console.log(dateList);

        let finalData, finalDate;
        if (slot == 'week') {
            finalData = totalEmissionList.slice(0, 10);
            finalDate = dateList.slice(0, 10);
        } else {
            const agg = studentHistory.reduce((result, item) => {
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
    }, [studentHistory, slot]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[900]],
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
    slot: PropTypes.string
};

export default EmissionPredictionSingle;