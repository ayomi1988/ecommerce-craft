import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { Container } from "@mui/material";



export default function MainLayout () {
    return ( 
        <>  
            <ToastContainer style={{ width: "90%" }}  />
         
            <Container sx={{marginTop: '60px'}}> <Outlet/> </Container>
            </>  
      
    );
};