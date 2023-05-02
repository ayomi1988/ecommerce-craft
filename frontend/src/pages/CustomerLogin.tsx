import ValidationSchema from "../Validation/AdminLoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../store/useDispatch";
import { useSelector } from "react-redux";
import CustomerForm from "../components/organisms/login/CustomerForm";
import { fetchCustomerById, createCustomer, fetchCustomers } from "../store/customerLogin/CustomerSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export type Customer = {
  _id?: string;
  user_name: string;
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
  customers: CustomerList
}

const CustomerLogin = () => {
  
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
    setError,
  } = useForm<Customer>({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

//get details
  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id))
        .then(unwrapResult)
        .then((data) => {})
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

      if (singleRecord) {
        const { user_name, password } =
          singleRecord;
        const data = {
          user_name,
          password,
        };
        reset(data);
      }
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Customer) => {
    if (id) {
    } else {
      reset();
      navigate("/crafts/");
      AlertMessage('Customer Logged Successfully','success');
    }
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px', width:'600px'}}> 
        <CustomerForm
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

export default CustomerLogin;
