import React, { useRef, useEffect, useState } from "react";
import { Grid, Stack, Button } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/admin/useDispatch";
import { fetchAdmins, deleteAdmin, fetchAdminById } from "../../../store/admin/AdminSlice";
import Loader from "../../atoms/Loader";
import "react-confirm-alert/src/react-confirm-alert.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { useNavigate, Link } from "react-router-dom";
import {AlertMessage} from '../../atoms/Alerts';
import GridItem from '../../molecules/gridItem/GridItem';
import {ButtonGrid, ButtonList} from '../../atoms/Button'


export type clientView = {
    _id?: string;
    first_name: string;
    email: string;
    user_name: string;
    password: string;
  }

export type clientViewList = {
    data: string[];
    loading:boolean;
    message:string;
    error?:string;
    singleRecord: clientView;
  }
  
  export type StateValue = {
    admins: clientViewList
  }

export default function AdminData() {  
  const dispatch = useAppDispatch();
  const [isView, setIsView] = useState(true);
  const navigate = useNavigate();


 //get Admin list

  const getAdminsLists = useRef(
    debounce(() => {      
      dispatch(fetchAdmins())
        .unwrap()
        .then((data) => {})
    }, 600)
  ).current;

  useEffect(() => {
   // throw Error();
    getAdminsLists();
  }, [getAdminsLists]);

  const { data, loading } = useSelector(
    (state: StateValue) => state.admins || {}
  );


// delete Admin data by id

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
    dispatch(deleteAdmin(id))
      .then(unwrapResult)
      .then((data: any) => {
        dispatch(fetchAdmins());
        AlertMessage('Successfully deleted !','success');
      })
  };

 
// redirect to list page into edit page
 
  const redirectToEdit = (id: string) => {    
    navigate(`/admin/edit/${id}`);
  };


 

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid data-cy="grid-container" container rowSpacing={3} columnSpacing={3}>
      <>
      <Stack width="100%" direction="row" justifyContent="end" alignItems="end" spacing={2}>
      </Stack>
      <GridItem
          customer={data}
          deleteCustomer={deleteHandler}
          redirectToEdit={redirectToEdit}
        ></GridItem>
        </>
    </Grid>
  );
};


