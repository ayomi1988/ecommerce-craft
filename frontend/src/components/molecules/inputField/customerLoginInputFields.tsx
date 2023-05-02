import { Grid,FormHelperText, InputLabel, FilledInput } from '@mui/material';
import { Controller,Control } from 'react-hook-form';

type Customerfields = {
    _id?: string;
    user_name: string;
    password: string;
  }

type InputViewProps = {
    label:string;
    control:Control<Customerfields> | undefined;
    error?:string;
    titleName: any;
    id?:string;
};


const InputField = ({label,control,error,titleName, id}: InputViewProps) => {
    return (
        
        <Grid container>
            <Grid item md={4}><InputLabel htmlFor={`${label}-id`} id={`${label}-id`}>{label}</InputLabel></Grid>
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

export default InputField;