import { CardContent, Card, Grid, Toolbar, Container, Hidden } from "@mui/material";
import { Control, FieldErrorsImpl } from "react-hook-form";
import { FormEventHandler } from "react";
import {InputField, InputFieldDisabled, InputFieldHidden} from '../../molecules/inputField/craftDetailFields';
import {BuyButton, ButtonBack} from "../../atoms/Button";



type Craft = {
    _id?: string;
    product_name : string;
    price:  string;
    quantity:  string;
    description: string;
    first_name: string;
    email: string;
    order_number : string;
    total: string;
  }

type FormSubmitDataProps = {
  id?: string;
  formData: boolean;
  errors: Partial<FieldErrorsImpl<Craft>>;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;  
  control: Control<Craft> | undefined; 
  
};

const CraftInfo = ({
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
      name={"Back to product list"}
      redirectPath={"/crafts"}
    />
  </Toolbar>  
  <Container sx={{marginTop: '60px'}}> 
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <InputFieldDisabled
            label={"Product Name"}
            titleName={"product_name"}
            control={control}
            error={errors?.product_name?.message}       
          />
          <InputFieldDisabled
            label={"Price"}
            titleName={"price"}
            control={control}
            error={errors?.price?.message}           
          />
          <InputField
            label={"Quantity"}
            titleName={"quantity"}
            control={control}
            error={errors?.quantity?.message}            
          />
          <InputFieldDisabled
            label={"Description"}
            titleName={"description"}
            control={control}
            error={errors?.description?.message}            
          />
<Hidden xsUp>
   <InputFieldHidden
            label={"first_name"}
            titleName={"first_name"}
            control={control}
            error={errors?.first_name?.message}           
          />
          <InputFieldHidden
            label={"email"}
            titleName={"email"}
            control={control}
            error={errors?.email?.message}            
          />
          <InputFieldHidden
            label={"order_number"}
            titleName={"order_number"}
            control={control}
            error={errors?.order_number?.message}            
          />  

          <InputFieldHidden
            label={"total"}
            titleName={"total"}
            control={control}
            error={errors?.total?.message}          
          /> 
</Hidden>
           
          <BuyButton formData={formData} id={id}/>
        </CardContent>
      </Card>
    </form>
       </Container>     
       </Grid>
  );
};

export default CraftInfo;
