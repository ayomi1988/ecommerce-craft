import ValidationSchema from "../../Validation/OrderSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../store/order/useDispatch";
import { useSelector } from "react-redux";
import EditEmpForm from "../../components/organisms/editForm/EditOrder";
import { fetchOrderById, createOrder, updateOrder } from "../../store/order/OrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export type Order = {
  _id?: string;
  first_name: string;
  email: string;
  order_number: string;
  price: string;
  product_name: string;
  quantity: string;
  total: string;

}

export type OrderList = {
  data: string[];
  loading:boolean;
  message:string;
  error?:string;
  singleRecord: Order;
}

export type StateValue = {
  orders: OrderList;
}

const EditFormPage = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { singleRecord } = useSelector(
    (state: StateValue) => state.orders || {}
  );

  //validate
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    //setError,
  } = useForm<Order>({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      first_name: "",
      email: "",
      order_number: "",
      price: "",
      product_name: "",
      quantity: "",
      total: "",

    },
  });

//get details
  useEffect(() => {

    console.log({id});
    if (id) {
      dispatch(fetchOrderById(id))
        .then(unwrapResult)
        .then((data) => {

if (singleRecord) {

  const { first_name, email, order_number, price, product_name, quantity, total} = data;
  const dataa = {
    first_name,
    email,
    order_number,
    price,
    product_name,
    quantity,
    total,
  };
  reset(dataa);
}
        })
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

  
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Order) => {
    if (id) {
      await dispatch(updateOrder({ ...data, _id: id }));
      reset();
      navigate("/orders/list");
      AlertMessage('updated Successfully','success');
    } 
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px'}}> 
        <EditEmpForm
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

export default EditFormPage;
