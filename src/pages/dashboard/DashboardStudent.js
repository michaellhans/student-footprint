import { useState, Fragment, useEffect } from 'react';

// material-ui
import {
    Avatar,
    Box,
    Button,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Stack,
    Typography,
    Skeleton,
    Autocomplete
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers-pro';

// project import
import EmissionPredictionSingle from './EmissionPredictionSingle';
import EmissionDistribution from './EmissionDistribution';
import MainCard from 'components/MainCard';
import HighlightProfile from 'components/cards/statistics/HighlightProfile';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import GreenAction from './GreenAction';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { calculateSuccess, startLoading } from 'store/reducers/student';
import { formattedDate } from 'utils/format';
import dayjs from 'dayjs';
import StudentProfile from './StudentProfile';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const url = 'http://127.0.0.1:5000/student';
export const NIM_list = [
    23522011, 13519020, 13519142, 23522018, 23521047, 13519129, 23521011, 18221157, 18219309, 18221142, 23522025, 18219004, 13519063,
    23521062, 23522012, 23522008, 13519143, 23521072, 23522023, 23521071, 23522048, 13519053, 18220005, 23521083, 13519208, 23522005,
    13519183, 18220004, 13520112, 23522027, 18221001, 13521100, 23521092, 23520041, 13519200, 13519043, 18221044, 13519184, 13519096,
    13521095, 13519104, 18221163, 18219027, 13519026, 13520110, 13519149, 13520050, 13520117, 13519027, 13519038, 23522013, 13519022,
    13520105, 13520090, 18220055, 13520057, 13521162, 13520094, 18220018, 13520076, 13520156, 23522006, 13519176, 13520009, 18220014,
    18219075, 13520029, 13520163, 13519213, 18220101, 13519163, 23522043, 13519061, 13520085, 13520096, 18219047, 23521093, 23521041,
    13520017, 13520116, 13520016, 13520164, 18219081, 23522020, 18219071, 13520065, 23522045, 23522033, 13520055, 18220017, 23521080,
    23521009, 13519106, 13519011, 13519047, 13521153, 23522007, 23521074, 18220051, 13520136, 13520045, 18220053, 23521007, 23522041,
    22521020, 23522046, 23521065, 23522054, 23521023, 23521078, 23521028, 23522030, 23521016, 23522002, 23522047, 13520115, 18219073,
    18219082, 23521043, 13521139, 13521116, 13521052, 13521056, 13521071, 13521046, 18219014, 13521094, 13519009, 13519174, 13520099,
    18220038, 13521096, 18219065, 13521089, 18220035, 18220107, 13521045, 18219006, 18220106, 18221043, 13519093, 18221020, 13520039,
    18219106, 18219104, 18220103, 18221002, 13520020
];

function get_percentage(value, avg) {
    return (Math.abs(value - avg) / avg) * 100;
}

const DashboardStudent = () => {
    const [slot, setSlot] = useState('day');
    const [startDate, setStartDate] = useState(dayjs('2022-08-01'));
    const [endDate, setEndDate] = useState(dayjs('2023-05-31'));
    const [NIM, setNIM] = useState('23522011');
    const student = useSelector((state) => state.student);
    const stdProfile = student.cf_profile;
    const green_action = student.green_action;
    const isLoading = student.isLoading;
    const [isProfilePage, setIsProfilePage] = useState(false);
    const avatar = stdProfile && stdProfile.gender == 'Female' ? avatar1 : avatar2;
    // Change it into == null again later

    const dispatch = useDispatch();

    const handleStartDateChange = (value) => {
        setStartDate(value);
    };

    const handleEndDateChange = (value) => {
        setEndDate(value);
    };

    const handleNIMChange = (event, newValue) => {
        setNIM(newValue);
    };

    useEffect(() => {
        setIsProfilePage(false);
    }, [stdProfile]);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                NIM: NIM,
                start_date: startDate ? formattedDate(startDate) : '2022-08-01',
                end_date: endDate ? formattedDate(endDate) : '2023-05-31'
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
    }, [dispatch, NIM, startDate, endDate]);

    return isProfilePage ? (
        <StudentProfile />
    ) : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Student Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="profile user" src={avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={stdProfile && stdProfile.name}
                                    secondary={
                                        <Fragment>
                                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                                {stdProfile && stdProfile.NIM}
                                            </Typography>
                                            {' / '}
                                            {stdProfile && stdProfile.major}
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2.6}>
                            <Stack spacing={0.5}>
                                <Typography>NIM</Typography>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={NIM_list}
                                    value={NIM}
                                    onChange={handleNIMChange}
                                    renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
                                />
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
            {isLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rounded" height={1000} sx={{ width: 1 / 1 }} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <HighlightProfile
                            title="Carbon Footprint"
                            count={`${(student.cf_in_out['in_class'] + student.cf_in_out['out_class']).toFixed(2)} kg CO2e`}
                            percentage={35}
                            isLoss={false}
                            extra={45.6}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <HighlightProfile
                            title="Distance to Campus"
                            count={(stdProfile && stdProfile.distance) + ' km'}
                            isLoss={stdProfile && stdProfile.distance <= stdProfile.comparison.avg_distance}
                            percentage={stdProfile && get_percentage(stdProfile.distance, stdProfile.comparison.avg_distance).toFixed(1)}
                            extra={(stdProfile && Math.abs(stdProfile.distance - stdProfile.comparison.avg_distance).toFixed(1)) + ' km'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <HighlightProfile
                            title="Laptop usage"
                            count={stdProfile && stdProfile.day_laptop_total + ' hours'}
                            isLoss={stdProfile && stdProfile.day_laptop_total <= stdProfile.comparison.avg_laptop_usage}
                            percentage={
                                stdProfile && get_percentage(stdProfile.day_laptop_total, stdProfile.comparison.avg_laptop_usage).toFixed(1)
                            }
                            extra={
                                (stdProfile && Math.abs(stdProfile.day_laptop_total - stdProfile.comparison.avg_laptop_usage).toFixed(1)) +
                                ' hours'
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MainCard contentSX={{ p: 2.25 }}>
                            <Stack spacing={0.5}>
                                <Typography variant="h6" color="textSecondary">
                                    Commuting Information
                                </Typography>
                                <List sx={{ p: 0 }}>
                                    <ListItem sx={{ p: 0 }}>
                                        <ListItemText primary="Transportation" />
                                        <Typography>{stdProfile && stdProfile.mode_transportation}</Typography>
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        <ListItemText primary="Residence" />
                                        <Typography>{stdProfile && stdProfile.residence}</Typography>
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        <ListItemText primary="Travel time" />
                                        <Typography>{stdProfile && stdProfile.travel_time} minutes</Typography>
                                    </ListItem>
                                </List>
                            </Stack>
                        </MainCard>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                        <Typography variant="h6" color="textSecondary">
                            Learning Behavior
                        </Typography>
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Use laptop on class" />
                                <Typography>{stdProfile && stdProfile.use_laptop_on_class ? 'Yes' : 'No'}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Daily laptop usage" />
                                <Typography>{stdProfile && stdProfile.day_laptop_total} hours</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Laptop usage for coursework" />
                                <Typography>{stdProfile && stdProfile.day_laptop_outclass} hours</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Daily Smartphone usage" />
                                <Typography>{stdProfile && stdProfile.day_phone_total} hours</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Paper consumption per lecture" />
                                <Typography>{stdProfile && stdProfile.paper_consumption} sheets</Typography>
                            </ListItem>
                        </List>
                    </Stack>
                </MainCard>
            </Grid> */}

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
                                <EmissionPredictionSingle slot={slot} history={student.cf_history} />
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
                                total_emission={student.cf_in_out['in_class'] + student.cf_in_out['out_class']}
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
                            <EmissionDistribution distribution={student.cf_category} />
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
                            <EmissionDistribution distribution={student.cf_in_out} />
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
                            <EmissionDistribution distribution={student.cf_activity} />
                        </MainCard>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default DashboardStudent;
