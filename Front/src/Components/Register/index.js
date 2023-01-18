import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import './RegStyles/index.css';
import { RegContainer } from './RegStyles/index';
import { Box } from '@mui/system';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register({ auth }) {
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = { name, email, password };
        await axios
            .post('http://localhost:5001/auth/register', body)
            .then((res) => setData(res.data))
            .catch((err) => {
                console.log(err.message);
            });
    };

    if (data.token) {
        localStorage.setItem('token', data.token);
        auth(true);
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                    <h1>Register Here</h1>
                </Box>
            </Box>

            <RegContainer>
                <form onSubmit={onSubmit}>
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Name'
                        name='name'
                        value={name}
                        placeholder='Name'
                        onChange={onChange}
                        type='text'
                        variant='standard'
                    />

                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={onChange}
                        type='text'
                        variant='standard'
                    />
                    <TextField
                        sx={{ marginBottom: 1 }}
                        id='standard-basic'
                        label='Password'
                        name='password'
                        value={password}
                        placeholder='Password'
                        onChange={onChange}
                        type='password'
                        variant='standard'
                    />
                    <Button variant='contained' type='submit'>
                        REGISTER
                    </Button>
                </form>
                <Link
                    style={{ textDecoration: 'none', color: 'red' }}
                    to={'/login'}
                >
                    <p>Login</p>
                </Link>
            </RegContainer>
        </Box>
    );
}

export default Register;
