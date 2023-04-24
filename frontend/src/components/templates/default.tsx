import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import TitleBar from "../molecules/titleBar/BackEndTitlebar";
import { Container } from "@mui/material";
import ErrorBoundary from '../../components/atoms/ErrorBoundary'


export default function MainLayout () {
    return ( 
        <ErrorBoundary>  
            <ToastContainer style={{ width: "90%" }}  />
            <TitleBar/>
            <Container sx={{marginTop: '60px'}}> <Outlet/> </Container>
            </ErrorBoundary>  
      
    );
};