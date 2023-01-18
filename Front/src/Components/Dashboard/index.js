import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCreator from './EventCreator';

function Dashboard({ auth }) {
    const [user, setUser] = useState({});

    const getInfo = async (token) => {
        const { data } = await axios.get('http://localhost:5001/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);
        setUser(data);
        auth(true);
    };

    useEffect(() => {
        const token = localStorage?.getItem('token');
        getInfo(token);
    }, []);

    return (
        <div>
            <h1>{user.name}</h1>
            <h1>Balance: {user.balance}</h1>

            <EventCreator />
        </div>
    );
}

export default Dashboard;
