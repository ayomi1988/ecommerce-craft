  
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import { Container } from "@mui/material";
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomerDetails from "../components/organisms/details/CustomerDetails";
import OrderDetails from "../components/organisms/details/OrderDetails";
import CraftsDetails from "../components/organisms/details/CraftsDetails";
import AdminDetails from "../components/organisms/details/AdminDetails";
import TitleBar from "../components/molecules/titleBar/BackEndTitlebar";

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
 
    <Box sx={{ width: '100%', marginTop: '60px' }}>
     
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Customer Details" {...a11yProps(0)} />
          <Tab label="Orders" {...a11yProps(1)} />
          <Tab label="Crafts" {...a11yProps(2)} />
          <Tab label="Admin Users" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <CustomerDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
            <OrderDetails />
      </TabPanel>
      <TabPanel value={value} index={2}>
            <CraftsDetails />
      </TabPanel>
      <TabPanel value={value} index={3}>
            <AdminDetails />
      </TabPanel>
    </Box>
    </Container>
  );
}



