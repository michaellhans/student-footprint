import { useState, Fragment } from 'react';

// material-ui
import { Avatar, Button, FormControl, Grid, ListItem, ListItemAvatar, ListItemText, MenuItem, Stack, Typography } from '@mui/material';

import Select from '@mui/material/Select';

import { DatePicker } from '@mui/x-date-pickers-pro';

// project import
import EmissionTable from './EmissionTable';
import MainCard from 'components/MainCard';
import avatar2 from 'assets/images/users/avatar-2.png';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DataView = () => {
    const [level, setLevel] = useState('major');
    const [slot, setSlot] = useState(level);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [timeframe, setTimeframe] = useState('Day');

    const handleStartDateChange = (value) => {
        setStartDate(value.toDate());
    };

    const handleEndDateChange = (value) => {
        setEndDate(value.toDate());
    };

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
                        onClick={() => setLevel('major')}
                        color={level === 'major' ? 'primary' : 'secondary'}
                        variant={level === 'major' ? 'outlined' : 'text'}
                    >
                        Major
                    </Button>
                    <Button
                        size="medium"
                        style={{ width: 200, borderBottom: '1px solid' }}
                        onClick={() => setLevel('course')}
                        color={level === 'course' ? 'primary' : 'secondary'}
                        variant={level === 'course' ? 'outlined' : 'text'}
                    >
                        Course
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
                            <Stack spacing={0.5}>
                                <Typography>Timeframe</Typography>
                                <FormControl>
                                    <Select value={timeframe} onChange={(event) => setTimeframe(event.target.value)} label="Semester">
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
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="subtitle1" spacing={4} sx={{ pb: 0.3 }}>
                                Look by
                            </Typography>
                            <Button
                                size="small"
                                onClick={() => setSlot(level)}
                                color={slot === level ? 'primary' : 'secondary'}
                                variant={slot === level ? 'outlined' : 'text'}
                            >
                                {level}
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setSlot(timeframe)}
                                color={slot === timeframe ? 'primary' : 'secondary'}
                                variant={slot === timeframe ? 'outlined' : 'text'}
                            >
                                {timeframe}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <EmissionTable />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DataView;
