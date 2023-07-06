import { Container, Grid } from "@mui/material";
import FormSubmitDataPropss from "../components/organisms/login/AdminForm";

export type Admin = {
  _id?: string;
  user_name: string;
  password: string;
}

export type AdminList = {
  data: string[];
  loading:boolean;
  message:string;
  error?:string;
  singleRecord: Admin;
}

export type StateValue = {
  admins: AdminList
}

const AdminLogin = () => {
 

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px', width:'600px'}}> 
        <FormSubmitDataPropss/>
      </Container>     
    </Grid>
  );
};

export default AdminLogin;
