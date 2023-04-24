import {Container, Grid, TableHead, TableRow, TableContainer, Table, TableBody, Paper, TableCell, tableCellClasses} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DeleteButton, ButtonEdit } from "../../atoms/Button"; 


export type CustomerListType = {
    customer: any;
    deleteCustomer:Function,
    redirectToEdit :Function,
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const CustomersListTable = ({
    customer,
    deleteCustomer,
    redirectToEdit,
  }: CustomerListType) => {
    return (
      <Container sx={{marginTop: '60px'}}> 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>password</StyledTableCell>
              <StyledTableCell>Number</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((customer: any, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1 }} align="left">
                  {customer.first_name + "" + customer.last_name}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {customer.email}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {customer.number}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="center">
                <Grid container>
                    <Grid md={6}><DeleteButton onClick={deleteCustomer} id={customer._id} /></Grid>
                    <Grid md={6}><ButtonEdit onClick={redirectToEdit} id={customer._id} /></Grid>                 
                </Grid>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      
    );
  };
  
  export default CustomersListTable;