import { useState, Fragment, useEffect } from 'react';

// material-ui
import {
    Avatar,
    Box,
    Button,
    FormControl,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Stack,
    Typography
} from '@mui/material';

import Select from '@mui/material/Select';

import { DatePicker } from '@mui/x-date-pickers-pro';

// project import
import EmissionPredictionSingle from './EmissionPredictionSingle';
import EmissionComparison from './EmissionComparison';
import EmissionDistribution from './EmissionDistribution';
import MainCard from 'components/MainCard';
import HighlightProfile from 'components/cards/statistics/HighlightProfile';

// assets
import avatar2 from 'assets/images/users/avatar-2.png';
import GreenAction from './GreenAction';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { calculateSuccess, startLoading } from 'store/reducers/major';
import { formattedDate } from 'utils/format';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const url = 'http://127.0.0.1:5000/major';

const DashboardMajor = () => {
    const [slot, setSlot] = useState('week');
    const [startDate, setStartDate] = useState(dayjs('2023-01-16'));
    const [endDate, setEndDate] = useState(dayjs('2023-05-30'));
    const [timeframe, setTimeframe] = useState('Day');
    const [major, setMajor] = useState('IF');
    const majorData = useSelector((state) => state.major);

    const dispatch = useDispatch();

    const handleStartDateChange = (value) => {
        setStartDate(value);
    };

    const handleEndDateChange = (value) => {
        setEndDate(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                major: major,
                start_date: startDate ? formattedDate(startDate) : '2023-01-16',
                end_date: endDate ? formattedDate(endDate) : '2023-05-30'
            });
            try {
                const response = await fetch(`${url}?${params.toString()}`);
                if (response.ok) {
                    const res = await response.json();
                    dispatch(calculateSuccess(res.data));
                } else {
                    console.error('Error: ', response.status);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        dispatch(startLoading);
        fetchData();
    }, [dispatch, major, startDate, endDate]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Major Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <Stack spacing={0.5}>
                                <Typography>Major</Typography>
                                <FormControl>
                                    <Select value={major} onChange={(event) => setMajor(event.target.value)} label="Major">
                                        <MenuItem value={'IF'}>Bachelor of Informatics</MenuItem>
                                        <MenuItem value={'STI'}>Bachelor of Information System and Technology</MenuItem>
                                        <MenuItem value={'MIF'}>Master of Informatics</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2.6}>
                            <Stack spacing={0.5}>
                                <Typography>Timeframe</Typography>
                                <FormControl>
                                    <Select value={timeframe} onChange={(event) => setTimeframe(event.target.value)} label="Timeframe">
                                        <MenuItem value={'Day'}>Day</MenuItem>
                                        <MenuItem value={'Week'}>Week</MenuItem>
                                        <MenuItem value={'Month'}>Month</MenuItem>
                                        <MenuItem value={'Semester'}>Semester</MenuItem>
                                        <MenuItem value={'Year'}>Year</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2.6}>
                            <Stack spacing={0.5}>
                                <Typography>Start Period</Typography>
                                <DatePicker value={startDate} onChange={handleStartDateChange} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2.6}>
                            <Stack spacing={0.5}>
                                <Typography>End Period</Typography>
                                <DatePicker value={endDate} onChange={handleEndDateChange} />
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <HighlightProfile
                    title="Carbon Footprint"
                    count={`${(majorData.cf_in_out['in_class'] + majorData.cf_in_out['out_class']).toFixed(2)} kg CO2e`}
                    percentage={27.4}
                    isLoss
                    color="warning"
                    extra="1,943"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <HighlightProfile title="Distance to Campus" count="4.5 km" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <HighlightProfile title="Laptop usage" count="8.5 hours" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                        <Typography variant="h6" color="textSecondary">
                            Commuting Information
                        </Typography>
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Vehicle used" />
                                <Typography>Motorcycle</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Fuel used" />
                                <Typography>Pertamax</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Travel time" />
                                <Typography>45 minutes</Typography>
                            </ListItem>
                        </List>
                    </Stack>
                </MainCard>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Carbon Footprint From Time to Time</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            <Button
                                size="small"
                                onClick={() => setSlot('month')}
                                color={slot === 'month' ? 'primary' : 'secondary'}
                                variant={slot === 'month' ? 'outlined' : 'text'}
                            >
                                Month
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setSlot('week')}
                                color={slot === 'week' ? 'primary' : 'secondary'}
                                variant={slot === 'week' ? 'outlined' : 'text'}
                            >
                                Week
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <EmissionPredictionSingle slot={slot} history={majorData.cf_history} />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Green Action</Typography>
                    </Grid>
                </Grid>
                <Grid sx={{ mt: 2, mb: 4 }}>
                    <GreenAction id={1} />
                    <GreenAction id={2} />
                    <GreenAction id={3} />
                    <GreenAction id={4} />
                </Grid>
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 2 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                Emission Category Distribution
                            </Typography>
                            <Typography>Commuting contribute the highest emission</Typography>
                        </Stack>
                    </Box>
                    <EmissionDistribution distribution={majorData.cf_category} />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 2 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                Emission In-Class vs Out-Class
                            </Typography>
                            <Typography>Out-class activity contribute the most on learning</Typography>
                        </Stack>
                    </Box>
                    <EmissionDistribution distribution={majorData.cf_in_out} />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 2 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                Emission Activity Distribution
                            </Typography>
                            <Typography>Coursework contribute the highest emission</Typography>
                        </Stack>
                    </Box>
                    <EmissionDistribution distribution={majorData.cf_activity} />
                </MainCard>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Classes Emission Comparison</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                May Period Statistics
                            </Typography>
                            <Typography variant="h3">50.4 kg CO2e produced from Electricity</Typography>
                        </Stack>
                    </Box>
                    <EmissionComparison isExam={false} coursesEmission={majorData.cf_course_distribution} />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Paper-based vs Electronic-based</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                May Period Statistics
                            </Typography>
                            <Typography variant="h3">Paper-based is 30% greener</Typography>
                        </Stack>
                    </Box>
                    <EmissionComparison isExam={true} coursesEmission={majorData.cf_course_distribution} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardMajor;
