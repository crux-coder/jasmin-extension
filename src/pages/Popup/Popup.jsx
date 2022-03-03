import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ChallengeSelect from './ChallengeSelect';
import './Popup.css';

const Popup = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [fccUtilityEnabled, setFccUtilityEnabled] = useState(false);

  useEffect(() => {
    /* eslint-disable no-undef */
    chrome.storage.local.get(
      [
        'CHALLENGE_INDEX',
        'FCC_UTILITY_ENABLED',
        'RESPONSIVE_WEB_DESIGN_CHALLNEGES',
      ],
      function (items) {
        const {
          CHALLENGE_INDEX,
          FCC_UTILITY_ENABLED,
          RESPONSIVE_WEB_DESIGN_CHALLNEGES,
        } = items;
        setChallenges(RESPONSIVE_WEB_DESIGN_CHALLNEGES);
        setCurrentChallengeIndex(CHALLENGE_INDEX);
        setFccUtilityEnabled(FCC_UTILITY_ENABLED);
      }
    );
    /* eslint-enable no-undef */
  }, []);

  return (
    <Grid className="App" container spacing={2}>
      <Grid item xs={12}>
        <ChallengeSelect challenges={challenges} />
      </Grid>
    </Grid>
  );
};

export default Popup;
