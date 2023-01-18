import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { RegContainer } from '../../Register/RegStyles';

function FootballForms() {
    const [state, setState] = useState({
        player1: '',
        player2: '',
        odd1: '',
        odd2: '',
        odd3: '',
    });

    const { team1, team2, odd1, odd2, odd3 } = state;

    function onChange(e) {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex

        if (
            e.target.value === '' ||
            re.test(e.target.value) ||
            !e.target.name.includes('odd')
        ) {
            setState((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                    <h3>Football event</h3>
                </Box>
            </Box>

            <RegContainer>
                <form /* onSubmit={onSubmit} */>
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Team 1'
                        name='team1'
                        value={team1}
                        placeholder='Team 1'
                        onChange={onChange}
                        type='text'
                        variant='standard'
                    />
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Team 2'
                        name='team2'
                        value={team2}
                        placeholder='Team 2'
                        onChange={onChange}
                        type='text'
                        variant='standard'
                    />
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Odds 1'
                        name='odd1'
                        value={odd1}
                        placeholder='Player 2'
                        onChange={onChange}
                        type='text'
                        variant='standard'
                    />
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Odds 2'
                        name='odd2'
                        value={odd2}
                        placeholder='Odds 2'
                        onChange={onChange}
                        type='text'
                        variant='standard'
                    />
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Odds 3'
                        name='odd3'
                        value={odd3}
                        placeholder='Odds 3'
                        onChange={onChange}
                        type='text'
                        variant='standard'
                    />
                    <Button variant='contained' type='submit'>
                        Create Event
                    </Button>
                </form>
            </RegContainer>
        </Box>
    );
}

export default FootballForms;
