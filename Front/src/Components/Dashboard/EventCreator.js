import { Box } from '@mui/system';
import TennisForm from './Forms/TennisForm';
import FootballForms from './Forms/FootballForms';
import { Button } from '@mui/material';
import { useState } from 'react';

function EventCreator() {
    const [choice, setChoice] = useState('');

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: 3,
                    padding: 4,
                }}
            >
                <Box>
                    <Button
                        variant='contained'
                        onClick={() => setChoice('tennis')}
                    >
                        Tennis
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => setChoice('football')}
                    >
                        Football
                    </Button>
                </Box>
                {choice === 'tennis' ? (
                    <Box>
                        <TennisForm />
                    </Box>
                ) : (
                    <Box>
                        <FootballForms />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default EventCreator;
