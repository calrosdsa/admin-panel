import Layout from "../components/Layout";
import axios from 'axios'
import LandingPage from "../components/LandingPage";
const Dashboard = () =>{
    return(
        <Layout title="Panel Admin">
      <div className={`relative  w-full`}>
      <LandingPage/>
        </div>
        </Layout>   
    )
}

export default Dashboard;