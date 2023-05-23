import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

const YesCircle = styled('div')({
    margin: 'auto',
    display: 'flex',
    width: '14px',
    height: '14px',
    backgroundColor: '#F5222D',
    borderRadius: '50%'
});

const NoCircle = styled('div')({
    margin: 'auto',
    display: 'flex',
    width: '14px',
    height: '14px',
    backgroundColor: '#FAAD14',
    borderRadius: '50%'
});

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 365,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '45%',
            borderRadius: 4,
            horizontal: true
        }
    },
    colors: [
        function ({ value }) {
            if (value < 70) {
                return '#FAAD14';
            } else {
                return '#F5222D';
            }
        }
    ],
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: [
            'IF6099 Tesis',
            'IF5230 Aplikasi Inteligensi Buatan untuk Enterprise',
            'IF5100 Pemrograman Data Analitik',
            'IF5099 Metodologi Penelitian',
            'IF5200 Proyek Penelitian Terapan',
            'IF5132 Keberlanjutan Sistem Informasi',
            'IF4092 Tugas Akhir 2'
        ],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: true
    },
    grid: {
        show: false
    }
};

const electronic = {
    yes: 'Required electronic device',
    no: "Doesn't required electronic device"
};

const exam = {
    yes: 'Electronic-based exam',
    no: 'Paper-based exam'
};

// ==============================|| COURSES EMISSION BAR CHART ||============================== //

EmissionComparison.propTypes = {
    isExam: PropTypes.bool
};

const EmissionComparison = ({ isExam }) => {
    const theme = useTheme();
    console.log(isExam);

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const [series] = useState([
        {
            data: [80, 95, 70, 78, 65, 55, 42]
        }
    ]);

    const [options, setOptions] = useState(barChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, info, info, info]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primary, info, secondary]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={365} />
            <Stack direction="column" spacing={0.5} alignItems="flex-start" justifyContent="flex-start" sx={{ p: 2, pt: 0, pl: '30%' }}>
                <Stack direction="row" spacing={2}>
                    <YesCircle />
                    <Typography variant="caption">{isExam ? exam.yes : electronic.yes}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <NoCircle />
                    <Typography variant="caption">{isExam ? exam.no : electronic.no}</Typography>
                </Stack>
            </Stack>
        </div>
    );
};

export default EmissionComparison;
