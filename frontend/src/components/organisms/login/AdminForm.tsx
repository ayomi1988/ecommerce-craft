import { CardContent, Card, Grid, Toolbar, Container } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';

import { useNavigate } from "react-router-dom";


const API_URL = 'http://localhost:8071';




function FormSubmitDataPropss () {
  
const navigate = useNavigate();
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/crafts/admin`, { user_name, password });
      setToken(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

 

  const handleProtectedRequest = async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken(response.data.token);
      console.log('Protected endpoint response:', response.data);
    } catch (error) {
      console.error('Protected request failed:', error);
    }
  };

  return (
    <Grid item container spacing={2} data-cy="form">
    <Toolbar sx={{display:'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
   
  </Toolbar>  
  <Container sx={{marginTop: '60px'}}> 

      <Card>
        <CardContent data-cy="card-container">
        <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center', marginBottom: '20px' } }}
          >
            Login to Dashboard
          </Typography>
        <div style={{width: "100%", marginBottom: '10px', display: 'flex'}}>
        <label style={{padding: '10px', width: '150px'}} htmlFor="username">Username:</label>
        <input style={{border: 'solid 2px #cccccc', padding: '10px'}}
          type="text"
          id="username"
          value={user_name}
          onChange={(e) => setUser_name(e.target.value)}
        />
      </div>
      <div style={{width: "100%", marginBottom: '10px', display: 'flex'}}>
        <label style={{padding: '10px',  width: '150px'}} htmlFor="password">Password:</label>
        <input style={{border: 'solid 2px #cccccc', padding: '10px'}}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>


  <div>
        <button style={{width: "100%", padding: '6px', backgroundColor:'#000000', color: '#ffffff'}} onClick={handleLogin} >Login</button>
      </div>
      {token && (
        <div>
          <h2>Token:</h2>
         {token}
          <button onClick={handleProtectedRequest}>Make Protected Request</button>
        </div>
      )}
      
      
        </CardContent>
      </Card>
 
       </Container>     
       </Grid>
  );
};

export default FormSubmitDataPropss;
