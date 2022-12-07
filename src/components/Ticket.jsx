import "../App.css";
import React, { useState } from "react";
import axios from "axios";

const Ticket = (props) => {
  const [status, setStatus] = useState(props.status);

  //changing the date type, returns only year-month-day
  const stdate = props.stdate.slice(0, 10).replace(/-/g, "/");
  const ddate = props.ddate.slice(0, 10).replace(/-/g, "/");

  //handler for status, takes the number returns text
  const statusHandler = () => {
    if (status === 0) {
      return "Open";
    } else if (status === 1) {
      return "In Progress";
    } else {
      return "Finished";
    }
  };

  //changes the color of the left part in the ticket based on the status 
  const setBackColor = () => {
    if (status === 0) {
      return { background: "rgb(243, 83, 83)" };
    } else if (status === 1) {
      return { background: "rgb(56, 116, 203)" };
    } else if (status === 2) {
      return { background: "rgb(21, 130, 18)" };
    }
  };

  //changes the color of the ticket description based on the status
  const setTitleColor = () => {
    if (status === 0) {
      return { color: "rgb(243, 83, 83)" };
    } else if (status === 1) {
      return { color: "rgb(56, 116, 203)" };
    } else if (status === 2) {
      return { color: "rgb(21, 130, 18)" };
    }
  };

  //checks if tax Id exists, otherwise changes the color of the text to red
  const checkTaxId = () => {
    if (props.taxid != null) {
      const taxid = props.taxid.slice(0, 8).split("").reverse();
      let totVal = 0;
      let lastNum = props.taxid.slice(8, 9);
      for (let i = 1; i <= taxid.length; i++) {
        totVal = totVal + taxid[i - 1] * Math.pow(2, i);
      }
      if ((totVal % 11) % 10 == lastNum) {
        return { color: "rgb(0,0,0)" };
      }
    }
    return { color: "rgb(243, 83, 83)" };
  };

  //handler to when a ticket title is clicked
  const handleClick = (event) => {
    if (event.detail === 2) {
      updateAPI(props.id, status);
      setStatus(2);
      statusHandler();
      setTitleColor();
      setBackColor();
    }
  };

  //updates the API with the new status
  const updateAPI = (id, status) => {
    axios
      .post(
        "https://frontendtest.unixfor.gr/api/Tickets/UpdateStatus",
        {
          Id: id,
          Status: 2,
        },
        {
          headers: {
            Authorization: `bearer ${props.token}`,
          },
        }
      )
      .then(
        (response) => {
          
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="ticket-wrapper" style={setBackColor()}>
      <div className="ticket-info-wrapper">
        <div
          className="ticket-title"
          style={setTitleColor()}
          onClick={handleClick}
        >
          {props.title}
        </div>
        <div className="ticket-info">
          <p className="ticket-info-title">Id:</p>
          <p className="ticket-info-value">{props.id}</p>
        </div>
        <div className="ticket-info">
          <p className="ticket-info-title">Start Value:</p>
          <p className="ticket-info-value">{stdate}</p>
        </div>
        <div className="ticket-info">
          <p className="ticket-info-title">Due Date:</p>
          <p className="ticket-info-value">{ddate}</p>
        </div>
        <div className="ticket-info">
          <p className="ticket-info-title">Assignee:</p>
          <p className="ticket-info-value">{props.assignee}</p>
        </div>
        <div className="ticket-info">
          <p className="ticket-info-title">Status:</p>
          <p className="ticket-info-value">{statusHandler()}</p>
        </div>
        <div className="ticket-info">
          <p className="ticket-info-title">Tax Id:</p>
          <p className="ticket-info-value" style={checkTaxId()}>
            {props.taxid}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
