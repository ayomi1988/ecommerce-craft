import ValidationSchema from "../../Validation/CustomerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../store/useDispatch";
import { useSelector } from "react-redux";
import CustomerForm from "../../components/organisms/addForm/CustomerForm";
import { fetchCustomerById, createCustomer, updateCustomer } from "../../store/customer/CustomerSlice";
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
  customers: CustomerList
}

const CustomerAction = () => {
  
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
    if (id) {
      dispatch(fetchCustomerById(id))
        .then(unwrapResult)
        .then((data) => {})
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

      if (singleRecord) {
        const { first_name, user_name, email, password } =
          singleRecord;
        const data = {
          first_name,
          user_name,
          email,
          password,
        };
        reset(data);
      }
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Customer) => {
    if (id) {
      await dispatch(updateCustomer({ ...data, _id: id }));
    } else {
      await dispatch(createCustomer(data));
      reset();
      navigate("/crafts/signin");
      AlertMessage('Customers Data Added Successfully','success');
    }
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px'}}> 
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

export default CustomerAction;
