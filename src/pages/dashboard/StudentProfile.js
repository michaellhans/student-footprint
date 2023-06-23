import Box from '@mui/material/Box';
import {
    TextField,
    Grid,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio,
    Stack
} from '@mui/material';

export default function StudentProfile() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };
    return (
        <>
            <Grid container columnSpacing={2.75}>
                {/* row 1 */}
                <Grid item xs={12}>
                    <Typography variant="h5">Student Profile Form</Typography>
                </Grid>
                <Grid item xs={12} lg={6} sx={{ p: 1 }}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, mb: 1.5 },
                            '& .MuiFormControl-root': { m: 1, mb: 1.5 },
                            '& .MuiTypography-root': { m: 1, mb: 0.25 }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={1}>
                                <Typography variant="h5">Student Profile</Typography>
                                <TextField label="NIM" inputProps={{ maxLength: 8 }} />
                                <TextField label="Name" />
                                <FormControl>
                                    <InputLabel id="major-label">Major</InputLabel>
                                    <Select label="Major">
                                        <MenuItem value={'IF'}>Bachelor of Informatics</MenuItem>
                                        <MenuItem value={'STI'}>Bachelor of Information System and Technology</MenuItem>
                                        <MenuItem value={'MIF'}>Master of Informatics</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="semester-label">Semester</InputLabel>
                                    <Select label="Semester">
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography>Gender</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup name="gender">
                                        <Stack direction="row" spacing={1}>
                                            <FormControlLabel value="Man" control={<Radio />} label="Man" />
                                            <FormControlLabel value="Woman" control={<Radio />} label="Woman" />
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                                <Typography variant="h5">Commuting Behavior</Typography>
                                <FormControl>
                                    <InputLabel id="transportation-label">Mode Transportation</InputLabel>
                                    <Select labelId="transportation-label" label="Mode Transportation">
                                        <MenuItem value="Public transportation">Public transportation</MenuItem>
                                        <MenuItem value="Private car">Private car</MenuItem>
                                        <MenuItem value="Private motorcycle">Private motorcycle</MenuItem>
                                        <MenuItem value="Taxi">Taxi</MenuItem>
                                        <MenuItem value="Bicycle">Bicycle</MenuItem>
                                        <MenuItem value="Online transportation - motorcycle">Online transportation - motorcycle</MenuItem>
                                        <MenuItem value="Online transportation - car">Online transportation - car</MenuItem>
                                        <MenuItem value="Walk">Walk</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="Residence" />
                                <TextField label="Travel Time" type="number" InputProps={{ endAdornment: 'minutes' }} />
                                <TextField label="Distance" type="number" InputProps={{ endAdornment: 'km' }} />
                                <Typography>Do you stay on campus when there is three hours gap to the next class?</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup name="stay-on-campus">
                                        <Stack direction="row" spacing={1}>
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6} sx={{ p: 1 }}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, mb: 1.5 },
                            '& .MuiFormControl-root': { m: 1, mb: 1.5 },
                            '& .MuiTypography-root': { m: 1, mb: 0.25 }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack spacing={1}>
                            <Typography variant="h5">Learning Behavior</Typography>
                            <Typography>Do you use laptop on the class?</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup name="laptop-class">
                                    <Stack direction="row" spacing={1}>
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <Typography>Estimated Paper Consumption per Lecture</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup name="paper-consumption">
                                    <Stack direction="row" spacing={1}>
                                        <FormControlLabel value="None" control={<Radio />} label="None" />
                                        <FormControlLabel value="1-5 sheets" control={<Radio />} label="1-5 sheets" />
                                        <FormControlLabel value="5-15 sheets" control={<Radio />} label="5-15 sheets" />
                                        <FormControlLabel value="> 10 sheets" control={<Radio />} label="> 10 sheets" />
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <TextField label="Daily laptop usage" type="number" InputProps={{ endAdornment: 'hours' }} />
                            <TextField
                                label="Laptop usage outside class for academic purpose in a day"
                                type="number"
                                InputProps={{ endAdornment: 'hours' }}
                            />
                            <TextField label="Daily smartphone usage" type="number" InputProps={{ endAdornment: 'hours' }} />
                            <Typography variant="h5">Pandemic Behavior</Typography>
                            <TextField label="Pandemic daily laptop usage" type="number" InputProps={{ endAdornment: 'hours' }} />
                            <TextField
                                label="Pandemic laptop usage outside class for academic purpose in a day"
                                type="number"
                                InputProps={{ endAdornment: 'hours' }}
                            />
                            <TextField label="Pandemic daily smartphone usage" type="number" InputProps={{ endAdornment: 'hours' }} />
                            <Typography>Frequency of using Air Conditioner</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup name="ac-frequent">
                                    <Stack direction="row" spacing={1}>
                                        <FormControlLabel value="Never" control={<Radio />} label="Never" />
                                        <FormControlLabel value="Rarely" control={<Radio />} label="Rarely" />
                                        <FormControlLabel value="Sometimes" control={<Radio />} label="Sometimes" />
                                        <FormControlLabel value="Often" control={<Radio />} label="Often" />
                                        <FormControlLabel value="Always" control={<Radio />} label="Always" />
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Stack>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
