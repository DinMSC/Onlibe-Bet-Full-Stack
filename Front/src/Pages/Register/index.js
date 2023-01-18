import RegisterComp from '../../Components/Register/index';

function Register({ auth }) {
    return (
        <div>
            <RegisterComp auth={auth} />
        </div>
    );
}

export default Register;
