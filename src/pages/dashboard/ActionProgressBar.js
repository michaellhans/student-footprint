import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import walking from 'assets/images/actions/walking.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MainCard from 'components/MainCard';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
});

function ActionProgressBar() {
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
                        <Img alt="complex" src={walking} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container direction="column" spacing={0.5}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            You can reduce 20% carbon with walking
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <ProgressBar now={60} style={{ height: 22 }} animated variant="danger" />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ActionProgressBar;
