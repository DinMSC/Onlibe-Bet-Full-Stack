import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { Dashboard, Login, Register, Tickets } from './Pages/index';
import { useEffect, useState } from 'react';

function App() {
    const [isAuth, setAuth] = useState(false);

    const auth = (boolean) => {
        if (localStorage.getItem('token')) {
            setAuth(true);
            return;
        }
        setAuth(false);
    };

    useEffect(() => {
        auth();
    }, []);

    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route
                        exact
                        path={'/register'}
                        element={
                            !isAuth ? (
                                <Register auth={auth} />
                            ) : (
                                <Navigate replace to={'/dashboard'} />
                            )
                        }
                    />
                    <Route
                        exact
                        path={'/login'}
                        element={
                            !isAuth ? (
                                <Login auth={auth} />
                            ) : (
                                <Navigate replace to={'/dashboard'} />
                            )
                        }
                    />
                    <Route
                        exact
                        path={'/dashboard'}
                        element={
                            isAuth ? (
                                <Dashboard auth={auth} />
                            ) : (
                                <Navigate replace to={'/login'} />
                            )
                        }
                    />
                    <Route
                        exact
                        path={'/tickets'}
                        element={
                            isAuth ? (
                                <Tickets auth={auth} />
                            ) : (
                                <Navigate replace to={'/login'} />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
