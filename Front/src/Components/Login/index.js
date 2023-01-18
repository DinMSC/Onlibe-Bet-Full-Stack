import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { RegContainer } from '../../Components/Register/RegStyles/index';
import '../../Components/Register/RegStyles/index.css';
import { Box } from '@mui/system';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ auth }) {
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = { email, password };
        await axios
            .post('http://localhost:5001/auth/login', body)
            .then((res) => {
                setData(res.data);
            })
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
                    <h1>Login</h1>
                </Box>
            </Box>

            <RegContainer>
                <form onSubmit={onSubmit}>
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
                        Login
                    </Button>
                </form>
                <Link
                    style={{ textDecoration: 'none', color: 'red' }}
                    to={'/register'}
                >
                    <p>Register Here</p>
                </Link>
            </RegContainer>
        </Box>
    );
}

export default Login;
