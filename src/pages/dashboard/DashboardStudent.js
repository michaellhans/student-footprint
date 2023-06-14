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
    TextField,
    Stack,
    Typography,
    Autocomplete
} from '@mui/material';

import Select from '@mui/material/Select';

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
const NIM_list = ['23522011', '13520115', '13519020'];

const DashboardStudent = () => {
    const [slot, setSlot] = useState('day');
    const [startDate, setStartDate] = useState(dayjs('2023-01-16'));
    const [endDate, setEndDate] = useState(dayjs('2023-05-30'));
    const [NIM, setNIM] = useState('23522011');
    const student = useSelector((state) => state.student);
    const stdProfile = student.cf_profile;
    const [isProfilePage, setIsProfilePage] = useState(stdProfile == null);
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
        setIsProfilePage(stdProfile == null);
    }, [stdProfile]);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                NIM: NIM,
                start_date: startDate ? formattedDate(startDate) : '2023-01-17',
                end_date: endDate ? formattedDate(endDate) : '2023-04-20'
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
    }, [NIM, startDate, endDate]);

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
                                {/* <FormControl>
                                    <Select value={NIM} onChange={(event) => setNIM(event.target.value)} label="NIM">
                                        <MenuItem value={'Day'}>Day</MenuItem>
                                        <MenuItem value={'Week'}>Week</MenuItem>
                                        <MenuItem value={'Month'}>Month</MenuItem>
                                        <MenuItem value={'Semester'}>Semester</MenuItem>
                                        <MenuItem value={'Year'}>Year</MenuItem>
                                    </Select>
                                </FormControl> */}
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <HighlightProfile
                    title="Carbon Footprint"
                    count={`${(student.cf_in_out['in_class'] + student.cf_in_out['out_class']).toFixed(2)} kg CO2e`}
                    percentage={27.4}
                    isLoss
                    color="warning"
                    extra="1,943"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <HighlightProfile
                    title="Distance to Campus"
                    count={(stdProfile && stdProfile.distance) + ' km'}
                    percentage={59.3}
                    extra="35,000"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <HighlightProfile
                    title="Laptop usage"
                    count={stdProfile && stdProfile.day_laptop_total + ' hours'}
                    percentage={27.4}
                    isLoss
                    color="warning"
                    extra="1,943"
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
        </Grid>
    );
};

export default DashboardStudent;
