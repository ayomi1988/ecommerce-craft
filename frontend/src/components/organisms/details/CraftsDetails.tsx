import React, { useRef, useEffect, useState } from "react";
import { Grid, Stack, Button } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/craft/useDispatch";
import { fetchCrafts, deleteCraft, fetchCraftById } from "../../../store/craft/CraftSlice";
import Loader from "../../atoms/Loader";
import "react-confirm-alert/src/react-confirm-alert.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { useNavigate, Link } from "react-router-dom";
import {AlertMessage} from '../../atoms/Alerts';
import GridItem from '../../molecules/gridItem/GridItem';
import CraftsListTable from '../../molecules/table/CraftsTable';
import {ButtonGrid, ButtonList} from '../../atoms/Button'


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
    Crafts: CraftList
  }

export default function CraftsData() {  
  const dispatch = useAppDispatch();
  const [isView, setIsView] = useState(true);
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
   // throw Error();
    getCraftsLists();
  }, [getCraftsLists]);

  const { data, loading } = useSelector(
    (state: StateValue) => state.Crafts || {}
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
    navigate(`/crafts/edit/${id}`);
  };


 // changing grid to list and list to grid action

 
  const ChangingView = () => {
    setIsView(!isView);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid data-cy="grid-container" container rowSpacing={3} columnSpacing={3}>
      <>
      <Stack width="100%" direction="row" justifyContent="end" alignItems="end" spacing={2}>
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


