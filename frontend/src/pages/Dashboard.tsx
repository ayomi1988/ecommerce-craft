  
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import { Container} from "@mui/material";
import { NavButton} from "../components/atoms/Button"; 
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomerDetails from "../components/organisms/details/CustomerDetails";
import OrderDetails from "../components/organisms/details/OrderDetails";
import CraftsDetails from "../components/organisms/details/CraftsDetails";
import AdminDetails from "../components/organisms/details/AdminDetails";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DashBoard() {
  const [value, setValue] = React.useState(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Container sx={{width: '100%'}}>

<Box sx={{ width: '100%' }}>     
  <AppBar component="nav">
 <Toolbar>
 <Box sx={{ display: 'block'}}>
  <NavButton data-cy="admin"
      name={"Admin"}
      redirectPath={"/dashboard/login"}/>
   </Box>   
   <Box sx={{ display: 'block'}}>
      <NavButton data-cy="crafts"
      name={"Crafts"}
      redirectPath={"/crafts"}/>
      </Box>
    </Toolbar>
   </AppBar>
   </Box>
    <Box sx={{ width: '100%', marginTop: '60px' }}>
     
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Admin Users" {...a11yProps(0)} />
          <Tab label="Customer Details" {...a11yProps(1)} />
          <Tab label="Orders" {...a11yProps(2)} />
          <Tab label="Crafts" {...a11yProps(3)} />
        
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <AdminDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
            <CustomerDetails />
      </TabPanel>
      <TabPanel value={value} index={2}>
            <OrderDetails />
      </TabPanel>
      <TabPanel value={value} index={3}>
            <CraftsDetails />
      </TabPanel>
     
    </Box>
    </Container>
  );
}



