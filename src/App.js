import ChallengeSelect from './components/ChallengesSelect';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid sx={{ width: '40em', height: '40em', padding: 1, borderRadius: 0.5 }} container spacing={2}>
      <Grid item xs={12}>
        <ChallengeSelect />
      </Grid>
    </Grid>
  );
}

export default App;
