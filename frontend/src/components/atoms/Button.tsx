import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AppsIcon from '@mui/icons-material/Apps';
import ViewListIcon from '@mui/icons-material/ViewList';


export type Props = {
    formData: boolean;
    id?: string;
    onClick: Function;
    name?:string;
    redirectPath:string;
  }

 

  export type ActionProps = {
    formData: boolean;
    id?: string;
  }

// Add and Update button 

function ActionButton ({ formData, id }: ActionProps) {

  return (
    <Button data-cy="submit-button" fullWidth variant="contained" type="submit" disabled={formData}>
    {id ? 'Update' : 'Create Craft'}
</Button>
  )
};

// Action button 

function CreateButton ({ formData, id }: ActionProps) {

  return (
    <Button data-cy="submit-button" fullWidth variant="contained" type="submit" disabled={formData}>
    {'Create'}
</Button>
  )
};

// Buy button 

function BuyButton ({ formData, id }: ActionProps) {

  return (
    <Button data-cy="submit-button" fullWidth variant="contained" type="submit" disabled={formData}>
    {'Buy'}
</Button>
  )
};

// Login button 

export type LoginProps = {
  formData: boolean;
  id?: string;
}

function LoginButton ({ formData, id }: LoginProps) {

  return (   
    <Button data-cy="submit-button" fullWidth variant="contained" type="submit" disabled={formData} >
    {'Login'}
</Button>
  )
};


// Login button 

export type SignupProps = {
  formData: boolean;
  id?: string;
}

function SignupButton ({ formData, id }: SignupProps) {

  return (   
    <Button data-cy="submit-button" fullWidth variant="contained" type="submit" disabled={formData} >
    {'Signup'}
</Button>
  )
};



export type BackProps = {
    name?:string;
    redirectPath:string;
  }

// Back button 

function ButtonBack ({name,redirectPath}: BackProps)  {
    const navigate = useNavigate();

    return (
        <Button data-cy="back-button" variant="outlined" onClick={()=>{navigate(redirectPath);}}>
       {name}
        </Button>
    );
};

// Nav button 

function NavButton ({name,redirectPath}: BackProps)  {
  const navigate = useNavigate();

  return (
      <Button data-cy="back-button" variant="contained" onClick={()=>{navigate(redirectPath);}}>
     {name}
      </Button>
  );
};



export type CommonProps = {
    id?: string;
    onClick: Function;
  }

// Delete button

function DeleteButton ({ onClick, id }: CommonProps)   {
    return (
      <Button data-cy="delete-icon" variant="contained" onClick={() => onClick(id)} startIcon={<DeleteIcon />}/>
    )
  };



// Edit button

function ButtonEdit ({ onClick, id }: CommonProps)  {
    return (
      <Button data-cy="edit-icon" variant="contained" onClick={() => onClick(id)} startIcon={<HowToRegIcon />} />
    )
  };



  // View Detail button

function ViewDetail ({ onClick, id }: CommonProps)  {
  return (
    <Button data-cy="edit-icon" variant="outlined" onClick={() => onClick(id)} sx={{width: '100%'}}>
      {'View Detail'}
      </Button>
  )
};


  export type IcoProps = {
    onClick: Function;
  }

// Grid button

function ButtonGrid ({ onClick}: IcoProps)  {
    return (
      <Button variant="contained" onClick={() => onClick()} startIcon={<AppsIcon />}/>
    )
  };



// List button

function ButtonList ({ onClick }: IcoProps)  {
    return (
      <Button data-cy="list-icon" variant="contained" onClick={() => onClick()} startIcon={<ViewListIcon />}  />
    )
  };



  
export {ActionButton, LoginButton, ButtonBack, DeleteButton, ButtonEdit, ButtonGrid, ButtonList, SignupButton, NavButton, BuyButton, CreateButton, ViewDetail}