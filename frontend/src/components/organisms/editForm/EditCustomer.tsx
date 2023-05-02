import { CardContent, Card, Grid, Toolbar, Container } from "@mui/material";
import { Control, FieldErrorsImpl } from "react-hook-form";
import { FormEventHandler } from "react";
import InputField from '../../molecules/inputField/customerInputFields';
import {ActionButton, ButtonBack} from "../../atoms/Button";



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

const EditCustomerForm = ({
  handleSubmit,
  formData,
  id,
  errors,
  control,
  
}: FormSubmitDataProps) => {
  return (
    <Grid container spacing={2}>
    <Toolbar sx={{display:'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
    <ButtonBack
      name={"Go Back"}
      redirectPath={"/dashboard"}
    />
  </Toolbar>  
  <Container sx={{marginTop: '60px'}}> 
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <InputField
            label={"First Name"}
            titleName={"first_name"}
            control={control}
            error={errors?.first_name?.message}            
          />
          <InputField
            label={"Last Name"}
            titleName={"last_name"}
            control={control}
            error={errors?.user_name?.message}           
          />
          <InputField
            label={"Email"}
            titleName={"email"}
            control={control}
            error={errors?.email?.message}            
          />
          <InputField
            label={"Password"}
            titleName={"password"}
            control={control}
            error={errors?.password?.message}            
          />
          <ActionButton formData={formData} id={id}/>
        </CardContent>
      </Card>
    </form>
       </Container>     
       </Grid>
  );
};

export default EditCustomerForm;
