import { Grid,FormHelperText, InputLabel, FilledInput } from '@mui/material';
import { Controller,Control } from 'react-hook-form';

type CustomersFields = {
    _id?: string;
    first_name: string;
    user_name: string;
    email: string;
    password: string;
  }

type InputViewProps = {
    label:string;
    control:Control<CustomersFields> | undefined;
    error?:string;
    titleName: any;
    id?:string;
};


const InputField = ({label,control,error,titleName, id}: InputViewProps) => {
    return (
        
        <Grid container>
            <Grid item md={12}>
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

export default InputField;