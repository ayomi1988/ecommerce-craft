import React, { useRef, useEffect, useState } from "react";
import { Grid, Stack, Button } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/useDispatch";
import { fetchCrafts, deleteCraft, fetchCraftById } from "../../../store/craft/CraftSlice";
import Loader from "../../atoms/Loader";
import "react-confirm-alert/src/react-confirm-alert.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { useNavigate, Link } from "react-router-dom";
import {AlertMessage} from '../../atoms/Alerts';
import CraftGrid from '../../molecules/gridItem/GridItem';
import OrderAction from '../../../pages/add/CreateOrder';
import {ButtonGrid, ButtonList} from '../../atoms/Button'


export type clientView = {
    _id?: string;
    product_name : string;
    price:  string;
    quantity:  string;
    description: string;

    first_name: string;
    email: string;
    order_number : string;
    total: string;
  }

export type clientViewList = {
    data: string[];
    loading:boolean;
    message:string;
    error?:string;
    singleRecord: clientView;
  }
  
  export type StateValue = {
    crafts: clientViewList
  }

export default function ClientData() {  
  const dispatch = useAppDispatch();
  const [isView, setIsView] = useState(true);
  const navigate = useNavigate();


 //get Admin list

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
    (state: StateValue) => state.crafts || {}
  );




 
// redirect to list page into edit page
 
  const redirectToDetail = (id: string) => {    
    navigate(`/craft/detail/${id}`);
  };


 

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid data-cy="grid-container" container rowSpacing={3} columnSpacing={3}>
      <>
      <Stack width="100%" direction="row" justifyContent="end" alignItems="end" spacing={2}>
      </Stack>
      <CraftGrid
          craft={data}
          redirectToDetail={redirectToDetail}
        ></CraftGrid>
        </>
        
    </Grid>
  );
};


