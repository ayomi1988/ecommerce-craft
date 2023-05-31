import ValidationSchema from "../../Validation/CraftSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../store/useDispatch";
import { useSelector } from "react-redux";
import CraftInfo from "../../components/organisms/clientView/frontDetail";
import { fetchCraftById, updateCraft} from "../../store/craft/CraftSlice";
import {updateOrder } from "../../store/order/OrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export type Craft = {
  _id?: string;
  product_name: string;
  price: string;
  quantity: string;
  description: string;
  first_name: string;
  email: string;
  order_number : string;
  total: string;
}

export type CraftList = {
  data: string[];
  loading:boolean;
  message:string;
  error?:string;
  singleRecord: Craft;
}

export type StateValue = {
  crafts: CraftList;
}

const FrontendCraftD = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { singleRecord } = useSelector(
    (state: StateValue) => state.crafts || {}
  );

  //validate
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    //setError,
  } = useForm<Craft>({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      product_name: "",
      price: "",
      quantity: "",
      description: "",
      
  first_name: "",
  email: "",
  order_number : "",
  total: "",
    },
  });

//get details
  useEffect(() => {

    console.log({id});
    if (id) {
      dispatch(fetchCraftById(id))
        .then(unwrapResult)
        .then((data) => {

if (singleRecord) {

  const { product_name, price, quantity, description, first_name, email, order_number, total } = data;
  const dataa = {
    product_name,
    price,
    quantity,
    description,
    first_name,
    email,
    order_number,
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

  const onSubmit = async (data: Craft) => {
    if (id) {
      await dispatch(updateCraft({ ...data, _id: id }));
      reset();
      navigate("/crafts");
      AlertMessage('updated Successfully','success');
    } 
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px'}}> 
        <CraftInfo
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

export default FrontendCraftD;
