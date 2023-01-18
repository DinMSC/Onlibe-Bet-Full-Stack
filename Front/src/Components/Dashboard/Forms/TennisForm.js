import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { RegContainer } from '../../Register/RegStyles';
import axios from 'axios';

function TennisForm() {
    const [state, setState] = useState({
        type: 'tennis',
        player1: '',
        player2: '',
        odd1: '',
        odd2: '',
    });
    const [data, setData] = useState({});

    const { player1, player2, odd1, odd2, type } = state;

    function onChange(e) {
        const re = /^[0-9\b]+$/;
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

    const onSubmit = async (e) => {
        e.preventDefault();
        const details = { player1, player2, odd1, odd2, type };
        await axios
            .post('http://localhost:5001/dashboard/create-event', details)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    console.log(data);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                    <h3>Create Tennis event</h3>
                </Box>
            </Box>
            <RegContainer>
                <form onSubmit={onSubmit}>
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Player 1'
                        name='player1'
                        value={player1}
                        placeholder='Player 1'
                        onChange={onChange}
                        type='text'
                        variant='standard'
                    />
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Player 2'
                        name='player2'
                        value={player2}
                        placeholder='Player 2'
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
                    <Button variant='contained' type='submit'>
                        Create Event
                    </Button>
                </form>
            </RegContainer>
        </Box>
    );
}

export default TennisForm;
