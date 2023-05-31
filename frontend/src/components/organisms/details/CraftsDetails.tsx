import React, { useRef, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/useDispatch";
import { fetchCrafts, deleteCraft } from "../../../store/craft/CraftSlice";
import Loader from "../../atoms/Loader";
import "react-confirm-alert/src/react-confirm-alert.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import {AlertMessage} from '../../atoms/Alerts';
import CraftsListTable from '../../molecules/table/CraftsTable';
import {ButtonBack} from '../../atoms/Button'


export type Craft = {
    _id?: string;
    product_name : string;
    price:  string;
    quantity:  string;
    description: string;
  }

export type CraftList = {
    data: string[];
    loading:boolean;
    message:string;
    error?:string;
    singleRecord: Craft;
  }
  
  export type StateValue = {
    crafts: CraftList
  }

export default function CraftsData() {  
  const dispatch = useAppDispatch();
 
  const navigate = useNavigate();


 //get Craft list

  const getCraftsLists = useRef(
    debounce(() => {      
      dispatch(fetchCrafts())
        .unwrap()
        .then((data) => {})
    }, 600)
  ).current;

  useEffect(() => {
 
    getCraftsLists();
  }, [getCraftsLists]);

  const { data, loading } = useSelector(
    (state: StateValue) => state.crafts || {}
  );


// delete Crafts data by id

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
    dispatch(deleteCraft(id))
      .then(unwrapResult)
      .then((data: any) => {
        dispatch(fetchCrafts());
        AlertMessage('Successfully deleted !','success');
      })
  };

 
// redirect to list page into edit page
 
  const redirectToEdit = (id: string) => {    
    navigate(`/dashboard/craft/edit/${id}`);
  };




  if (loading) {
    return <Loader />;
  }

  return (
    <Grid data-cy="grid-container" container rowSpacing={3} columnSpacing={3}>
      <>
    
      <Stack sx={{marginTop: '60px'}} width="100%" direction="row" justifyContent="end" alignItems="end" spacing={2}>
      <ButtonBack
      name={"Add A Craft"}
      redirectPath={"/dashboard/craft/create"}
    />
    
      </Stack>
          <CraftsListTable
          craft={data}
          deleteCraft={deleteHandler}
          redirectToEdit={redirectToEdit}
        ></CraftsListTable>
        </>
    </Grid>
  );
};


