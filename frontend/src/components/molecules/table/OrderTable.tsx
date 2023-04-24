import {Container, Grid, TableHead, TableRow, TableContainer, Table, TableBody, Paper, TableCell, tableCellClasses} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DeleteButton, ButtonEdit } from "../../atoms/Button"; 


export type OrderListType = {
    order: any;
    deleteOrder:Function,
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
  
  const OrderListTable = ({
    order,
    deleteOrder,
    redirectToEdit,
  }: OrderListType) => {
    return (
      <Container sx={{marginTop: '60px'}}> 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Order Number</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order && order.map((order: any, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1 }} align="left">
                  {order.first_name}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {order.email}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {order.order_number}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {order.product_name}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {order.price}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {order.quantity}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {order.total}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="center">
                <Grid container>
                    <Grid md={6}><DeleteButton onClick={deleteOrder} id={order._id} /></Grid>
                    <Grid md={6}><ButtonEdit onClick={redirectToEdit} id={order._id} /></Grid>                 
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
  
  export default OrderListTable;