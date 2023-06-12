import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import walking from 'assets/images/actions/walking.png';
import electricity from 'assets/images/actions/electricity.jpg';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
});

GreenAction.propTypes = {
    id: PropTypes.number
};

function GreenAction({ id }) {
    const reduction = Math.random() * 100;
    return (
        <MainCard
            sx={{
                mb: 1,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 64, height: 64 }}>
                        <Img alt="complex" src={id % 2 == 0 ? walking : electricity} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container direction="column" spacing={0.5}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            You can reduce {parseInt(100 - reduction, 10)}% carbon with {id % 2 == 0 ? 'walking' : 'energy saving'}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <ProgressBar now={parseInt(reduction, 10)} style={{ height: 22 }} variant="warning" />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default GreenAction;
