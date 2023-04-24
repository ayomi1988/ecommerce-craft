import {Container, Grid, TableHead, TableRow, TableContainer, Table, TableBody, Paper, TableCell, tableCellClasses} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DeleteButton, ButtonEdit } from "../../atoms/Button"; 


export type CraftsListType = {
    craft: any;
    deleteCraft:Function,
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
  
  const CraftsListTable = ({
    craft,
    deleteCraft,
    redirectToEdit,
  }: CraftsListType) => {
    return (
      <Container sx={{marginTop: '60px'}}> 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Craft Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {craft && craft.map((craft: any, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1 }} align="left">
                  {craft.product_name}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {craft.price}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {craft.quantity}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {craft.description}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="center">
                <Grid container>
                    <Grid md={6}><DeleteButton onClick={deleteCraft} id={craft._id} /></Grid>
                    <Grid md={6}><ButtonEdit onClick={redirectToEdit} id={craft._id} /></Grid>                 
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
  
  export default CraftsListTable;