//import BasicTabs from '../components/organisms/AdminTabs';
   
import * as React from 'react';
import Container from '@mui/material/Container';
import AdminData from "../components/organisms/clientView/clientView";


const clientView = () => {
  return (
    <Container sx={{marginTop: '60px', textAlign:"center", with: '100%'}}>
          <AdminData />
    </Container>
  );
};

export default clientView;







