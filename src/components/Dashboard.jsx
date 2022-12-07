import '../App.css';
import { useState } from "react";
import axios from 'axios';
import Header from './Header'
import Tickets from './Tickets';
import ViewChanger from './ViewChanger';
import { useEffect } from "react";


const Dashboard = (props) => {

  const [userData, setUserData] = useState(props.data);
  const [ticketsData, setTicketsData] = useState('');
  const [view, setView] = useState('card');
  
  

  useEffect(() => getTickets(), [userData]);
  
  //get tickets from API
  const getTickets = () => {
    axios.get('https://frontendtest.unixfor.gr/api/Tickets/GetTickets', {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      setTicketsData(response.data);
    }, (error) => {
      console.log(error);
    });
  }


  return (
    <div className="Dashboard">
      
      <Header name={localStorage.getItem('name')} surname={localStorage.getItem('surname')} />
      <ViewChanger view={view} setView={setView}/>
      <Tickets ticketsList={ticketsData} token={localStorage.getItem('token')} view={view}/>
    </div>
  );
}

export default Dashboard;