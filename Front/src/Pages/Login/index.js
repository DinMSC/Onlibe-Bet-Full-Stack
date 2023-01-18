import LoginComp from '../../Components/Login/index';

function Login({ auth }) {
    return (
        <div>
            <LoginComp auth={auth} />
        </div>
    );
}

export default Login;
