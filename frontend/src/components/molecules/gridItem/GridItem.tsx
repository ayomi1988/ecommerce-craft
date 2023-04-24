import { Grid, Typography, CardContent, CardActions, Card,  CardMedia } from "@mui/material";
import { DeleteButton, ButtonEdit } from "../../atoms/Button"; 


export type CustomertistType = {
  customer: any;
    deleteCustomer:Function,
    redirectToEdit :Function,
  }

const EmployeeListGrid = ({
  customer,
  deleteCustomer,
  redirectToEdit,
}: CustomertistType) => {
  return customer && customer.map((customer: any, index: number) => (
    

<Grid item md={3} key={index} data-cy="grid-item">
  <Card>
 
<CardContent>
  <Typography data-cy="emp-name" gutterBottom variant="h5" component="div">
  {customer.first_name} {customer.last_name}
  </Typography>
  <Typography data-cy="emp-email" variant="body2" color="text.secondary">
  {customer.email}
  </Typography>
  <Typography data-cy="emp-number" variant="body2" color="text.secondary">
  {customer.number}
  </Typography>

</CardContent>
<CardActions>
<DeleteButton onClick={deleteCustomer} id={customer._id} />
<ButtonEdit onClick={redirectToEdit} id={customer._id} />
</CardActions>
</Card>
</Grid>


  ));
};

export default EmployeeListGrid;
