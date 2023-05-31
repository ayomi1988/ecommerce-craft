import { CardContent, Card, Grid, Container } from "@mui/material";
import { Control, FieldErrorsImpl } from "react-hook-form";
import { FormEventHandler } from "react";
import InputField from '../../molecules/inputField/orderInputFields';
import {ActionButton} from "../../atoms/Button";


type Order = {
    _id?: string;
    first_name: string;
    email: string;
    order_number : string;
    price:  string;
    product_name:  string;
    quantity:  string;
    total: string;
  }

type FormSubmitDataProps = {
  id?: string;
  formData: boolean;
  errors: Partial<FieldErrorsImpl<Order>>;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;  
  control: Control<Order> | undefined; 
  
};

const OrderForm = ({
  handleSubmit,
  formData,
  id,
  errors,
  control,
  
}: FormSubmitDataProps) => {
  return (
    <Grid item container spacing={2} data-cy="form">
    
  <Container sx={{marginTop: '60px'}}> 
    <form onSubmit={handleSubmit}  id="submitemp">
      <Card>
        <CardContent data-cy="card-container">
          <InputField data-test="empf-name"
            label={"First Name"}
            titleName={"first_name"}
            control={control}
            error={errors?.first_name?.message}            
          />
          <InputField data-testid="empf-namel"
            label={"Email"}
            titleName={"email"}
            control={control}
            error={errors?.email?.message}           
          />
          <InputField data-testid="empf-email"
            label={"Order Number"}
            titleName={"order_number"}
            control={control}
            error={errors?.order_number?.message}            
          />         
          <InputField data-testid="empf-number"
            label={"Price"}
            titleName={"price"}
            control={control}
            error={errors?.price?.message}            
          />
          <InputField data-testid="empf-number"
            label={"Product Name"}
            titleName={"product_name"}
            control={control}
            error={errors?.product_name?.message}            
          />
          <InputField data-testid="empf-number"
            label={"Quantity"}
            titleName={"quantity"}
            control={control}
            error={errors?.quantity?.message}            
          />
           <InputField data-testid="empf-number"
            label={"Total Ammount"}
            titleName={"total"}
            control={control}
            error={errors?.total?.message}            
          />
        <ActionButton formData={formData} id={id}/>
        </CardContent>
      </Card>
    </form>
       </Container>     
       </Grid>
  );
};

export default OrderForm;
