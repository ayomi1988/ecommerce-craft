import React, { useRef, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/useDispatch";
import { fetchOrders, deleteOrder } from "../../../store/order/OrderSlice";
import Loader from "../../atoms/Loader";
import "react-confirm-alert/src/react-confirm-alert.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import {AlertMessage} from '../../atoms/Alerts';
import OrderListTable from '../../molecules/table/OrderTable';


export type Order = {
    _id?: string;
    first_name: string;
    email: string;
    order_number : string;
    price:  string;
    product_name:  string;
    quantity:  string;
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

export default function OrderData() {  
  const dispatch = useAppDispatch();

  const navigate = useNavigate();


 //get Order list

  const getOrdersLists = useRef(
    debounce(() => {      
 
      dispatch(fetchOrders())
        .unwrap()
        .then((data) => {})
    }, 600)
  ).current;

  useEffect(() => {

  
    getOrdersLists();
  }, [getOrdersLists]);

  const { data, loading } = useSelector(
    (state: StateValue) => state.orders || {}
  );


// delete Order data by id

  const deleteHandler = (id: string) => {
    confirmAlert({
      title: "Are you sure? ",
      message: "Click Delete to confirm",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteAction(id),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteAction = (id: string) => {
    dispatch(deleteOrder(id))
      .then(unwrapResult)
      .then((data: any) => {
        dispatch(fetchOrders());
        AlertMessage('Successfully deleted !','success');
      })
  };

 
// redirect to list page into edit page
 
  const redirectToEdit = (id: string) => {    
    navigate(`/dashboard/order/edit/${id}`);
  };




  if (loading) {
    return <Loader />;
  }

  return (
    <Grid data-cy="grid-container" container rowSpacing={3} columnSpacing={3}>
      <>
      <Stack width="100%" direction="row" justifyContent="end" alignItems="end" spacing={2}>
      </Stack>
          <OrderListTable
          order={data}
          deleteOrder={deleteHandler}
          redirectToEdit={redirectToEdit}
        ></OrderListTable>
        </>
    </Grid>
  );
};


