import { CardContent, Card, Grid, Toolbar, Container, Typography } from "@mui/material";
import { Control, FieldErrorsImpl } from "react-hook-form";
import { FormEventHandler } from "react";
import InputField from '../../molecules/inputField/customerInputFields';
import {CreateButton, ButtonBack} from "../../atoms/Button";


type Customer = {
    _id?: string;
    first_name: string;
    user_name: string;
    email: string;
    password: string;
  }

type FormSubmitDataProps = {
  id?: string;
  formData: boolean;
  errors: Partial<FieldErrorsImpl<Customer>>;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;  
  control: Control<Customer> | undefined; 
  
};

const CustomerForm = ({
  handleSubmit,
  formData,
  id,
  errors,
  control,
  
}: FormSubmitDataProps) => {
  return (
    <Grid item container spacing={2} data-cy="form">
    <Toolbar sx={{display:'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
    <ButtonBack
      name={"Already Have an Account?"}
      redirectPath={"/crafts/signin"}
    />
  </Toolbar> 
  <Typography
            variant="h5"
            component="div"
            sx={{ width: '100%', textAlign:'center', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Create an Account
          </Typography> 
  <Container sx={{marginTop: '60px'}}> 
 
    <form onSubmit={handleSubmit}  id="submitemp">
      <Card>
        <CardContent data-cy="card-container"  sx={{ display: 'flex', justifyContent:'center', flexDirection:'column'}}>
          <InputField data-test="empf-name"
            label={"First Name"}
            titleName={"first_name"}
            control={control}
            error={errors?.first_name?.message}            
          />
          <InputField data-testid="empf-namel"
            label={"User Name"}
            titleName={"user_name"}
            control={control}
            error={errors?.user_name?.message}           
          />
          <InputField data-testid="empf-email"
            label={"Email"}
            titleName={"email"}
            control={control}
            error={errors?.email?.message}            
          />
          <InputField data-testid="empf-number"
            label={"password"}
            titleName={"password"}
            control={control}
            error={errors?.password?.message}            
          />
        <CreateButton formData={formData} id={id}/>
        </CardContent>
      </Card>
    </form>
       </Container>     
       </Grid>
  );
};

export default CustomerForm;
