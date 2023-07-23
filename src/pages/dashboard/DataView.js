import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { calculateSuccess, startLoading } from 'store/reducers/student';

// material-ui
import { Avatar, Button, Autocomplete, TextField, Grid, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers-pro';

// project import
import EmissionTable from './EmissionTable';
import MainCard from 'components/MainCard'; // assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import { formattedDate } from 'utils/format';
import dayjs from 'dayjs';
import EmissionTableMajor from './EmissionTableMajor';
import EmissionTableStudent from './EmissionTableStudent';
import { NIM_list } from './DashboardStudent';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const url = 'http://127.0.0.1:5000/';

const DataView = () => {
    const [level, setLevel] = useState('history');
    const [slot, setSlot] = useState(level);
    const [startDate, setStartDate] = useState(dayjs('2022-08-01'));
    const [endDate, setEndDate] = useState(dayjs('2023-05-31'));
    const [NIM, setNIM] = useState('23522011');
    const student = useSelector((state) => state.student);
    const stdProfile = student.cf_profile;
    const avatar = stdProfile && stdProfile.gender == 'Female' ? avatar1 : avatar2;

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
        const fetchData = async () => {
            const params = new URLSearchParams({
                NIM: NIM,
                start_date: startDate ? formattedDate(startDate) : '2022-08-01',
                end_date: endDate ? formattedDate(endDate) : '2023-05-31'
            });
            try {
                const response = await fetch(`${url}student?${params.toString()}`);
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

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Data View</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
                    <Button
                        size="medium"
                        style={{ width: 200, borderBottom: '1px solid' }}
                        onClick={() => setLevel('history')}
                        color={level === 'history' ? 'primary' : 'secondary'}
                        variant={level === 'history' ? 'outlined' : 'text'}
                    >
                        History
                    </Button>
                    <Button
                        size="medium"
                        style={{ width: 200, borderBottom: '1px solid' }}
                        onClick={() => setLevel('major')}
                        color={level === 'major' ? 'primary' : 'secondary'}
                        variant={level === 'major' ? 'outlined' : 'text'}
                    >
                        Major
                    </Button>
                    <Button
                        size="medium"
                        style={{ width: 200, borderBottom: '1px solid' }}
                        onClick={() => setLevel('student')}
                        color={level === 'student' ? 'primary' : 'secondary'}
                        variant={level === 'student' ? 'outlined' : 'text'}
                    >
                        Student
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mb: -2.25 }}>
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
                                <DatePicker defaultDate={new Date()} value={startDate} onChange={handleStartDateChange} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2.6}>
                            <Stack spacing={0.5}>
                                <Typography>End Period</Typography>
                                <DatePicker defaultDate={new Date()} value={endDate} onChange={handleEndDateChange} />
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>

            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Carbon Footprint Data per {level}</Typography>
                    </Grid>
                    <Grid item />
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
                <MainCard sx={{ mt: 2 }} content={false}>
                    {level == 'history' && <EmissionTable />}
                    {level == 'major' && <EmissionTableMajor startDate={startDate} endDate={endDate} />}
                    {level == 'student' && <EmissionTableStudent startDate={startDate} endDate={endDate} />}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DataView;
