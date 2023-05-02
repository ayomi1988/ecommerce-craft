import {Container, Grid, TableHead, TableRow, TableContainer, Table, TableBody, Paper, TableCell, tableCellClasses} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DeleteButton, ButtonEdit } from "../../atoms/Button"; 


export type AdminListType = {
    admin: any;
    deleteAdmin:Function,
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
  
  const AdminListTable = ({
    admin,
    deleteAdmin,
    redirectToEdit,
  }: AdminListType) => {
    return (
      <Container sx={{marginTop: '60px'}}> 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Admin Name</StyledTableCell>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Password</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin && admin.map((admin: any, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1 }} align="left">
                  {admin.first_name}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {admin.user_name}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {admin.email}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="left">
                  {admin.password}
                </TableCell>
                <TableCell sx={{ border: 1 }} align="center">
                <Grid container>
                    <Grid md={6}><DeleteButton onClick={deleteAdmin} id={admin._id} /></Grid>
                    <Grid md={6}><ButtonEdit onClick={redirectToEdit} id={admin._id} /></Grid>                 
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
  
  export default AdminListTable;