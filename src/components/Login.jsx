import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Login.css";

//style for error message modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = ({ setResponse }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //connect to the API
  const handleSubmit = (event) => {
    axios
      .post("https://frontendtest.unixfor.gr/api/Tickets/login", {
        Username: `${username}`,
        Password: `${password}`,
      })
      .then(
        (response) => {
          setResponse(response.data);
          //saves token to localStorage
          localStorage.setItem('token', response.data.Token);
          localStorage.setItem('name', response.data.Firstname);
          localStorage.setItem('surname', response.data.Lastname);
          navigate("/dashboard");
        },
        (error) => {
          //in case of error with the connection, setOpen(true), so it triggers the modal to open
          handleOpen();
        }
      );
    event.preventDefault();
  };

  return (
    <div className="login-background">
      {open && (<Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Wrong credentials!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please input the correct username and password.
              </Typography>
            </Box>
          </Modal>)}
      <div className="login-wrapper">
        <div className="user-pass-wrapper">
          <p className="user-pass-p">Username</p>
          <input
            type="text"
            className="user-pass-input"
            onChange={(e) => setUserName(e.target.value)}
          />
          <p className="user-pass-p">Password</p>
          <input
            className="user-pass-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="shape-blob"></div>
      <div className="shape-blob one"></div>
    </div>
  );
};

export default Login;
