import { Grid,FormHelperText,  FilledInput } from '@mui/material';
import { Controller,Control } from 'react-hook-form';

type CraftsFields = {
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

type InputViewProps = {
    label:string;
    control:Control<CraftsFields> | undefined;
    error?:string;
    titleName: any;
    id?:string;
};




const InputField = ({label,control,error,titleName, id}: InputViewProps) => {
    return (
        
        <Grid container>
            <Grid item md={8}>
                <Controller
                control={control}
                name={titleName}
                render={({field})=>(
                        <FilledInput                  
                        id={titleName}
                        placeholder={label}                    
                        {...field}
                        error={Boolean(error)}
                        autoComplete='off'                    
                        fullWidth                        
                        />
                    )}
                />
                <FormHelperText color='red'>{error}</FormHelperText>
            </Grid>
        </Grid>          
            
        
    );
};


const InputFieldDisabled = ({label,control,error,titleName, id}: InputViewProps) => {
    return (
        
        <Grid container>
            <Grid item md={8}>
                <Controller
                control={control}
                name={titleName}
                render={({field})=>(
                        <FilledInput                  
                        id={titleName}
                        placeholder={label}                    
                        {...field}
                        error={Boolean(error)}
                        autoComplete='off'                    
                        fullWidth
                        disabled
                        />
                    )}
                />
                <FormHelperText color='red'>{error}</FormHelperText>
            </Grid>
        </Grid>          
            
        
    );
};

const InputFieldHidden = ({label,control,error,titleName, id}: InputViewProps) => {
    return (
        
        <Grid container>
            <Grid item md={8}>
                <Controller
                control={control}
                name={titleName}
                render={({field})=>(
                        <FilledInput                  
                        id={titleName}                 
                        {...field}
                        hidden
                        disabled
                        />
                    )}
                />
            </Grid>
        </Grid>          
            
        
    );
};

export {InputField, InputFieldDisabled, InputFieldHidden};