import { CardContent, Card, Grid, Toolbar, Container } from "@mui/material";
import { Control, FieldErrorsImpl } from "react-hook-form";
import { FormEventHandler } from "react";
import InputField from '../../molecules/inputField/craftsInputFields';
import {ActionButton, ButtonBack} from "../../atoms/Button";


type Craft = {
    _id?: string;
    product_name : string;
    price:  string;
    quantity:  string;
    description: string;
  }

type FormSubmitDataProps = {
  id?: string;
  formData: boolean;
  errors: Partial<FieldErrorsImpl<Craft>>;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;  
  control: Control<Craft> | undefined; 
  
};

const CraftForm = ({
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
      name={"Go Back"}
      redirectPath={"/dashboard"}
    />
  </Toolbar>  
  <Container sx={{marginTop: '60px'}}> 
    <form onSubmit={handleSubmit}  id="submitemp">
      <Card>
        <CardContent data-cy="card-container">
        <InputField
            label={"Product Name"}
            titleName={"product_name"}
            control={control}
            error={errors?.product_name?.message}            
          />
          <InputField
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
          <InputField
            label={"Description"}
            titleName={"description"}
            control={control}
            error={errors?.description?.message}            
          />
        <ActionButton formData={formData} id={id}/>
        </CardContent>
      </Card>
    </form>
       </Container>     
       </Grid>
  );
};

export default CraftForm;
