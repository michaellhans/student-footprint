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
        width: 600,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            distributed: true,
            columnWidth: '45%',
            borderRadius: 4,
            horizontal: true
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
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
    yes: 'Required electronic device on class',
    no: "Doesn't required electronic device on class"
};

const exam = {
    yes: 'Electronic-based exam',
    no: 'Paper-based exam'
};

// ==============================|| COURSES EMISSION BAR CHART ||============================== //

EmissionComparison.propTypes = {
    isExam: PropTypes.bool,
    coursesEmission: PropTypes.array
};

function EmissionComparison({ isExam, coursesEmission }) {
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const [options, setOptions] = useState(barChartOptions);
    const [series, setSeries] = useState([
        {
            data: [80, 95, 70, 78, 65, 55, 42]
        }
    ]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    console.log(coursesEmission);

    useEffect(() => {
        // Extract list of total emission
        const totalEmissionList = coursesEmission.map((item) => item.emission);

        // Extract list of courses
        const courseList = coursesEmission.map((item) => item.course_id + ' ' + item.course_name);

        // Extract list of class electronic
        const colorMapping = {
            true: '#F5222D',
            false: '#FAAD14'
        };
        const classElectronic = coursesEmission.map((item) => colorMapping[item.class_electronic]);
        console.log(classElectronic);

        setSeries([{ data: totalEmissionList.slice(0, 10) }]);
        setCategories(courseList.slice(0, 10));
        setColors(classElectronic);
    }, [coursesEmission, isExam]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: colors.length > 0 ? [...colors] : ['#F5222D'],
            // colors: colors,
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, info, info, info]
                    }
                },
                categories: categories
            },
            tooltip: {
                theme: 'light'
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primary, info, secondary, categories, colors]);

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
}

export default EmissionComparison;
