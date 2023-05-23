// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="Sample Card">
        <Typography variant="body2">
            <ol>
                <li>Predict the ITB emission in a DD-MM-YYYY</li>
                <li>Predict the ITB emission in the next 2 days</li>
                <li>Predict the major emission (IF / STI / MIF)</li>
                <li>Predict the course emission (IF6099 Thesis)</li>
                <li>Predict the student emission (Michael Hans)</li>
                <li>Classifiy emission levels from each student and activity</li>
                <li>Show the emission graph in a year / month / week</li>
            </ol>
        </Typography>
    </MainCard>
);

export default SamplePage;
