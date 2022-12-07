import Ticket from "./Ticket";
import GridView from './GridView'
import UserWindow from './UserWindow';
import "../App.css";
import { useState } from "react";

const Tickets = (props) => {

  const [width, setWidth] = useState('');
  //if grid button is pressed, change the view from card to grid
  if (props.view == 'grid' && width.dynamicWidth > 700)
  {
    return <GridView tickets={props.ticketsList}/>
  }
 

  return (
        <div className="tickets-list">
          <UserWindow setWidth={setWidth}/>
          {props.ticketsList.length > 0 &&
            props.ticketsList.map((ticket, index) => (
              <Ticket
                key={index}
                id={ticket.Id}
                title={ticket.Name}
                stdate={ticket.StartDate}
                ddate={ticket.DueDate}
                assignee={ticket.Assignee}
                status={ticket.Status}
                taxid={ticket.TaxId}
                token={props.token}
              />
            ))}
        </div>
  );
};

export default Tickets;
