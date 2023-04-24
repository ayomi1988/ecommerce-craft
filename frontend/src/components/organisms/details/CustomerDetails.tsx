import React, { useRef, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/customer/useDispatch";
import { fetchCustomers, deleteCustomer, } from "../../../store/customer/CustomerSlice";
import Loader from "../../atoms/Loader";
import "react-confirm-alert/src/react-confirm-alert.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import {AlertMessage} from '../../atoms/Alerts';
import CustomersListTable from '../../molecules/table/CustomersTable';


export type Customer = {
    _id?: string;
    first_name: string;
    last_name: string;
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

export default function CustomerData() {  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


 //get Customer list

  const getCustomersLists = useRef(
    debounce(() => {      
      dispatch(fetchCustomers())
        .unwrap()
        .then((data) => {})
    }, 600)
  ).current;

  useEffect(() => {
    getCustomersLists();
  }, [getCustomersLists]);

  const { data, loading } = useSelector(
    (state: StateValue) => state.customers || {}
  );


// delete Customer data by id

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
    dispatch(deleteCustomer(id))
      .then(unwrapResult)
      .then((data: any) => {
        dispatch(fetchCustomers());
        AlertMessage('Successfully deleted !','success');
      })
  };

 
// redirect to list page into edit page
 
  const redirectToEdit = (id: string) => {    
    navigate(`/customers/edit/${id}`);
  };


 

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid data-cy="grid-container" container rowSpacing={3} columnSpacing={3}>
      <>
      <Stack width="100%" direction="row" justifyContent="end" alignItems="end" spacing={2}>
      </Stack>
          <CustomersListTable
          customer={data}
          deleteCustomer={deleteHandler}
          redirectToEdit={redirectToEdit}
        ></CustomersListTable>
        </>
    </Grid>
  );
};


