import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import walking from 'assets/images/actions/walking.png';
import electricity from 'assets/images/actions/electricity.jpg';
import carpool from 'assets/images/actions/carpool.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
});

GreenCard.propTypes = {
    id: PropTypes.number,
    percentage: PropTypes.number,
    value: PropTypes.number,
    action: PropTypes.string
};

GreenAction.propTypes = {
    green_action: PropTypes.object,
    total_emission: PropTypes.number
};

function get_percentage(value, avg) {
    return (Math.abs(value - avg) / avg) * 100;
}

function GreenCard({ id, percentage, value, action }) {
    return (
        <MainCard
            key={id}
            sx={{
                mb: 1,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 64, height: 64 }}>
                        <Img
                            alt="complex"
                            src={action === 'walking' ? walking : (action === 'energy_saving') == 1 ? electricity : carpool}
                        />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container direction="column" spacing={0.5}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            Reduce {parseInt(percentage, 10)}% carbon with {action}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <ProgressBar
                            now={parseInt(100 - percentage, 10)}
                            label={value.toFixed(2) + ' kg CO2e'}
                            style={{ height: 22 }}
                            variant="warning"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

function GreenAction({ green_action, total_emission }) {
    const actions = Object.keys(green_action);
    const reductions = Object.values(green_action);
    const percentages = reductions.map((value) => get_percentage(value, total_emission));
    let green_cards_data = actions.map((action, index) => ({
        id: index,
        action: action,
        value: reductions[index],
        percentage: percentages[index]
    }));

    green_cards_data.sort((a, b) => b.percentage - a.percentage);

    const green_cards = [];
    for (let idx = 0; idx <= 2; idx++) {
        const { id, action, value, percentage } = green_cards_data[idx];
        green_cards.push(<GreenCard key={id} id={id} action={action} value={value} percentage={percentage} />);
    }

    return <div>{green_cards}</div>;
}

export default GreenAction;
