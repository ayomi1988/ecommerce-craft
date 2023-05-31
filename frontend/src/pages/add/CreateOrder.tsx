import ValidationSchema from "../../Validation/OrderSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../store/useDispatch";
import { useSelector } from "react-redux";
import OrderForm from "../../components/organisms/addForm/OrderForm";
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
  orders: OrderList
}

const OrderAction = () => {
  
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
  } = useForm<Order>({
    resolver: yupResolver(ValidationSchema),
  });

//get details
  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id))
        .then(unwrapResult)
        .then((data) => {})
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

      if (singleRecord) {
        const { first_name, email, order_number, price, product_name, quantity, total } =
          singleRecord;
        const data = {
          first_name,
          email,
          order_number,
          price,
          product_name,
          quantity,
          total,
        };
        reset(data);
      }
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Order) => {
    if (id) {
      await dispatch(updateOrder({ ...data, _id: id }));
    } else {
      await dispatch(createOrder(data));
      reset();
      navigate("/Order/list");
      AlertMessage('Order Data Added Successfully','success');
    }
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px'}}> 
        <OrderForm
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

export default OrderAction;
