 
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ClientData from "../components/organisms/clientView/frontend";
import DrawerAppBar from "../components/molecules/titleBar/Navigation";


const frontView = () => {
  return ( 
    <Box>
     <DrawerAppBar/>
    <Container sx={{marginTop: '60px', textAlign:"center", with: '100%'}}>         
          <ClientData />
    </Container>
    </Box>
  );
};

export default frontView;







