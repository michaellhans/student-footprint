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
import EmissionPrediction from './EmissionPrediction';
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
import TransportationColumnChart from './TransportationColumnChart';
import PropTypes from 'prop-types';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const url = 'http://127.0.0.1:5000/summary';

const DashboardOverallStats = ({ startDate, endDate }) => {
    const [slot, setSlot] = useState('day');
    const [history, setHistory] = useState([]);
    const [profile, setProfile] = useState(null);
    const [comparison, setComparison] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                level: 'stats',
                start_date: startDate && formattedDate(startDate),
                end_date: endDate && formattedDate(endDate)
            });
            try {
                const response = await fetch(`${url}?${params.toString()}`);
                if (response.ok) {
                    const res = await response.json();
                    console.log(res.data);
                    setHistory(res.data.cf_history);
                    setProfile(res.data.cf_profile);

                    const result = {};
                    for (const key in res.data.cf_profile) {
                        if (res.data.cf_profile.hasOwnProperty(key)) {
                            result[key] = res.data.cf_profile[key].total_cf;
                        }
                    }
                    setComparison(result);
                } else {
                    console.error('Error: ', response.status);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchData();
    }, [startDate, endDate]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                        <Typography variant="h6" color="textSecondary">
                            ITB Profile
                        </Typography>
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Total students" />
                                <Typography>{`${profile && profile.ITB.num_of_students} students`}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Total CF" />
                                <Typography>{`${(profile && profile.ITB.total_cf.toFixed(2)) || 0} kg CO2e`}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Average CF" />
                                <Typography>{`${(profile && profile.ITB.avg_cf_students.toFixed(2)) || 0} kg CO2e`}</Typography>
                            </ListItem>
                        </List>
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                        <Typography variant="h6" color="textSecondary">
                            IF Profile
                        </Typography>
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Total students" />
                                <Typography>{`${profile && profile.IF.num_of_students} students`}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Total CF" />
                                <Typography>{`${(profile && profile.IF.total_cf.toFixed(2)) || 0} kg CO2e`}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Average CF" />
                                <Typography>{`${(profile && profile.IF.avg_cf_students.toFixed(2)) || 0} kg CO2e`}</Typography>
                            </ListItem>
                        </List>
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                        <Typography variant="h6" color="textSecondary">
                            STI Profile
                        </Typography>
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Total students" />
                                <Typography>{`${profile && profile.STI.num_of_students} students`}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Total CF" />
                                <Typography>{`${(profile && profile.STI.total_cf.toFixed(2)) || 0} kg CO2e`}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Average CF" />
                                <Typography>{`${(profile && profile.STI.avg_cf_students.toFixed(2)) || 0} kg CO2e`}</Typography>
                            </ListItem>
                        </List>
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Stack spacing={0.5}>
                        <Typography variant="h6" color="textSecondary">
                            MIF Profile
                        </Typography>
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Total students" />
                                <Typography>{`${profile && profile.MIF.num_of_students} students`}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Total CF" />
                                <Typography>{`${(profile && profile.MIF.total_cf.toFixed(2)) || 0} kg CO2e`}</Typography>
                            </ListItem>
                            <ListItem sx={{ p: 0 }}>
                                <ListItemText primary="Average CF" />
                                <Typography>{`${(profile && profile.MIF.avg_cf_students.toFixed(2)) || 0} kg CO2e`}</Typography>
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
                        <EmissionPrediction slot={slot} history={history} />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Major Emission Comparison</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <TransportationColumnChart transportationDistribution={comparison} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

DashboardOverallStats.propTypes = {
    startDate: PropTypes.object,
    endDate: PropTypes.object
};

export default DashboardOverallStats;
