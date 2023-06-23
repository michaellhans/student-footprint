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
import { calculateSuccess, startLoading } from 'store/reducers/itb';
import { formattedDate } from 'utils/format';
import VerticalBarChart from './VerticalBarChart';
import DashboardOverallStats from './DashboardOverallStats';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const url = 'http://127.0.0.1:5000/itb';

const DashboardOverall = () => {
    const [level, setLevel] = useState('ITB');
    const [slot, setSlot] = useState('day');
    const [startDate, setStartDate] = useState(dayjs('2023-01-16'));
    const [endDate, setEndDate] = useState(dayjs('2023-05-30'));
    const itb = useSelector((state) => state.itb);
    const itbProfile = itb.cf_profile;
    const green_action = itb.green_action;
    console.log(level);

    const most_used_transport =
        (itbProfile &&
            itbProfile.most_mode_transportation &&
            Object.keys(itbProfile.most_mode_transportation).reduce(function (a, b) {
                return itbProfile.most_mode_transportation[a] > itbProfile.most_mode_transportation[b] ? a : b;
            })) ||
        'Private motorcycle';

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
    }, [dispatch, startDate, endDate]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Overall Dashboard {level === 'Major Statistics' && ': Major Statistics'}</Typography>
                    </Grid>
                    <Grid item />
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="subtitle1" spacing={4} sx={{ pb: 0.3 }}>
                                Look by
                            </Typography>
                            <Button
                                size="small"
                                onClick={() => setLevel('ITB')}
                                color={level === 'ITB' ? 'primary' : 'secondary'}
                                variant={level === 'ITB' ? 'outlined' : 'text'}
                            >
                                ITB
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setLevel('Major Statistics')}
                                color={level === 'Major Statistics' ? 'primary' : 'secondary'}
                                variant={level === 'Major Statistics' ? 'outlined' : 'text'}
                            >
                                Major Statistics
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="profile user" src={avatar2} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Michael Hans"
                                    secondary={
                                        <Fragment>
                                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                                23522011
                                            </Typography>
                                            {' / Master of Informatics '}
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2.6}>
                            {/* <Stack spacing={0.5}>
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
                            </Stack> */}
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
            {level === 'Major Statistics' ? (
                <Grid item xs={12} sm={12}>
                    {level === 'Major Statistics' && <DashboardOverallStats startDate={startDate} endDate={endDate} />}
                </Grid>
            ) : (
                <>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <HighlightProfile
                                title="Carbon Footprint"
                                count={`${(itbProfile && itbProfile['total_cf'].toFixed(2)) || 0} kg CO2e`}
                                percentage={27.4}
                                isLoss
                                color="warning"
                                extra="1,943"
                            />
                            <HighlightProfile
                                title="Total Students"
                                count={`${(itbProfile && itbProfile['num_of_students']) || 0} students`}
                                percentage={27.4}
                                isLoss
                                color="warning"
                                extra="1,943"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <HighlightProfile
                                title="Carbon Footprint per Students"
                                count={`${(itbProfile && itbProfile['avg_cf_students'].toFixed(2)) || 0} kg CO2e`}
                                percentage={59.3}
                                extra="35,000"
                            />
                            <HighlightProfile
                                title="Daily Carbon Footprint Students"
                                count={`${(itbProfile && itbProfile['avg_cf_students_daily'].toFixed(2)) || 0} kg CO2e`}
                                percentage={59.3}
                                extra="35,000"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <HighlightProfile
                                title="Average distance"
                                count={itbProfile && itbProfile.avg_distance.toFixed(2) + ' km'}
                                percentage={27.4}
                                isLoss
                                color="warning"
                                extra="1,943"
                            />
                            <HighlightProfile
                                title="Average laptop usage"
                                count={itbProfile && itbProfile.avg_laptop_usage.toFixed(2) + ' hours'}
                                percentage={27.4}
                                isLoss
                                color="warning"
                                extra="1,943"
                            />
                        </Stack>
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
                                        onClick={() => setSlot('day')}
                                        color={slot === 'day' ? 'primary' : 'secondary'}
                                        variant={slot === 'day' ? 'outlined' : 'text'}
                                    >
                                        Day
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <MainCard content={false} sx={{ mt: 1.5 }}>
                            <Box sx={{ pt: 1, pr: 2 }}>
                                <EmissionPredictionSingle slot={slot} history={itb.cf_history} />
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
                            <GreenAction
                                green_action={green_action}
                                total_emission={itb.cf_in_out['in_class'] + itb.cf_in_out['out_class']}
                            />
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
                            <EmissionDistribution distribution={itb.cf_category} />
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
                            <EmissionDistribution distribution={itb.cf_in_out} />
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
                            <EmissionDistribution distribution={itb.cf_activity} />
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
                                        Period {startDate.format('YYYY-MM-DD')} until {endDate.format('YYYY-MM-DD')} statistics
                                    </Typography>
                                    <Typography variant="h3">50.4 kg CO2e produced from Electricity</Typography>
                                </Stack>
                            </Box>
                            <EmissionComparison isExam={false} coursesEmission={itb.cf_course_distribution} />
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
                                        Based on {itbProfile && itbProfile.num_of_students} ITB students
                                    </Typography>
                                    <Typography variant="h3">{most_used_transport} as the most used transportation</Typography>
                                </Stack>
                            </Box>
                            <VerticalBarChart
                                transportationDistribution={itbProfile && itbProfile.most_mode_transportation}
                                unit={'students'}
                            />
                        </MainCard>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default DashboardOverall;
