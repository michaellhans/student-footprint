import { useEffect, useState } from 'react';

// material-ui
import { Box, Button, Grid, List, ListItem, ListItemText, Skeleton, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import EmissionPrediction from './EmissionPrediction';

// assets
import PropTypes from 'prop-types';
import { formattedDate } from 'utils/format';
import VerticalBarChart from './VerticalBarChart';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const url = 'http://127.0.0.1:5000/summary';

const DashboardOverallStats = ({ startDate, endDate }) => {
    const [slot, setSlot] = useState('day');
    const [history, setHistory] = useState([]);
    const [profile, setProfile] = useState(null);
    const [comparison, setComparison] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                    setHistory(res.data.cf_history);
                    setProfile(res.data.cf_profile);

                    const result = {};
                    for (const key in res.data.cf_profile) {
                        if (res.data.cf_profile.hasOwnProperty(key)) {
                            result[key] = res.data.cf_profile[key].total_cf;
                        }
                    }
                    setComparison(result);
                    setIsLoading(false);
                } else {
                    console.error('Error: ', response.status);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        setIsLoading(true);
        fetchData();
    }, [startDate, endDate]);

    if (isLoading) {
        return (
            <Grid item xs={12}>
                <Skeleton variant="rounded" height={1000} sx={{ width: 1 / 1 }} />
            </Grid>
        );
    } else
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
                                    <Typography>{`${(profile && profile.ITB.num_of_students) || 0} students`}</Typography>
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
                                    <Typography>{`${(profile && profile.IF.num_of_students) || 0} students`}</Typography>
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
                                    <Typography>{`${(profile && profile.STI.num_of_students) || 0} students`}</Typography>
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
                                    <Typography>{`${(profile && profile.MIF.num_of_students) || 0} students`}</Typography>
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
                        <VerticalBarChart transportationDistribution={comparison} unit={'kg CO2e'} />
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
