import ValidationSchema from "../../Validation/CustomerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../store/useDispatch";
import { useSelector } from "react-redux";
import EditCustomerForm from "../../components/organisms/editForm/EditCustomer";
import { fetchCustomerById, updateCustomer } from "../../store/customer/CustomerSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export type Customer = {
  _id?: string;
  first_name: string;
  user_name: string;
  email: string;
  password: string;
}

export type CustomerList = {
  data: string[];
  loading:boolean;
  message:string;
  error?:string;
  singleRecord: Customer;
}

export type StateValue = {
  customers: CustomerList;
}

const EditCustomerPage = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { singleRecord } = useSelector(
    (state: StateValue) => state.customers || {}
  );

  //validate
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    //setError,
  } = useForm<Customer>({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      first_name: "",
      user_name: "",
      email: "",
      password: "",
    },
  });

//get details
  useEffect(() => {

    console.log({id});
    if (id) {
      dispatch(fetchCustomerById(id))
        .then(unwrapResult)
        .then((data) => {

if (singleRecord) {

  const { first_name, user_name, email, password } = data;
  const dataa = {
    first_name,
    user_name,
    email,
    password,
  };
  reset(dataa);
}
        })
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

  
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Customer) => {
    if (id) {
      await dispatch(updateCustomer({ ...data, _id: id }));
      reset();
      navigate("/dashboard");
      AlertMessage('updated Successfully','success');
    } 
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px'}}> 
        <EditCustomerForm
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          control={control}
          formData={false}
          id={id}
        />
      </Container>     
    </Grid>
  );
};

export default EditCustomerPage;
