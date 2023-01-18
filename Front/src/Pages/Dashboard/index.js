import DashboardComp from '../../Components/Dashboard/index';

function Dashboard({ auth }) {
    return (
        <div>
            <DashboardComp auth={auth} />
        </div>
    );
}

export default Dashboard;
