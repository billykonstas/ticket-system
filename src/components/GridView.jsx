import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../App.css'

const GridView = (props) => {

  //style for table cells
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'rgb(1, 22, 39)',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  //style for table rows
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //handler for status, takes the number returns text
  const statusHandler = (status) => {
    if (status === 0) {
      return "Open";
    } else if (status === 1) {
      return "In Progress";
    } else {
      return "Finished";
    }
  };

  //handler for the date, returns only year-month-day
  const dateHandler = (date) => {
    return date = date.slice(0, 10).replace(/-/g, "/");
  };

  //changes the color of the ticket description based on the status
  const setTitleColor = (status) => {
    if (status === 0) {
      return { color: "rgb(243, 83, 83)" };
    } else if (status === 1) {
      return { color: "rgb(56, 116, 203)" };
    } else if (status === 2) {
      return { color: "rgb(21, 130, 18)" };
    }
  };

  //checks if tax Id exists, otherwise changes the color of the text to red
  const checkTaxId = (gridTaxid) => {
    if (gridTaxid != null) {
      const taxid = gridTaxid.slice(0, 8).split("").reverse();
      let totVal = 0;
      let lastNum = gridTaxid.slice(8, 9);
      for (let i = 1; i <= taxid.length; i++) {
        totVal = totVal + taxid[i - 1] * Math.pow(2, i);
      }
      if ((totVal % 11) % 10 == lastNum) {
        return { color: "rgb(0,0,0)" };
      }
    }
    return { color: "rgb(243, 83, 83)" };
  };

  return (
    <div className="grid-view-wrapper">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="left">Id</StyledTableCell>
              <StyledTableCell align="left">Start Date</StyledTableCell>
              <StyledTableCell align="left">Due Date</StyledTableCell>
              <StyledTableCell align="left">Assignee</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Tax Id</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tickets.map((ticket, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" style={setTitleColor(ticket.Status)}>
                  {ticket.Name}
                </StyledTableCell>
                <StyledTableCell align="left">{ticket.Id}</StyledTableCell>
                <StyledTableCell align="left">
                  {dateHandler(ticket.StartDate)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {dateHandler(ticket.DueDate)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {ticket.Assignee}
                </StyledTableCell>
                <StyledTableCell align="left">{statusHandler(ticket.Status)}</StyledTableCell>
                <StyledTableCell align="left" style={checkTaxId(ticket.TaxId)}>{ticket.TaxId}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GridView;
