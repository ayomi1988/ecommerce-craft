import React, { useRef, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/useDispatch";
import { fetchCrafts} from "../../../store/craft/CraftSlice";
import Loader from "../../atoms/Loader";
import "react-confirm-alert/src/react-confirm-alert.css";
import { debounce } from "lodash";
import { useNavigate} from "react-router-dom";
import CraftGrid from '../../molecules/gridItem/GridItem';


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


