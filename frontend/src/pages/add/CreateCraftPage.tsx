import ValidationSchema from "../../Validation/CustomerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../store/craft/useDispatch";
import { useSelector } from "react-redux";
import CraftForm from "../../components/organisms/addForm/CraftForm";
import { fetchCraftById, createCraft, updateCraft } from "../../store/craft/CraftSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export type Craft = {
  _id?: string;
  product_name: string;
  price: string;
  quantity: string;
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

const CraftAction = () => {
  
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
    setError,
  } = useForm<Craft>({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      product_name: "",
      price: "",
      quantity: "",
      description: "",
    },
  });

//get details
  useEffect(() => {
    if (id) {
      dispatch(fetchCraftById(id))
        .then(unwrapResult)
        .then((data) => {})
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

      if (singleRecord) {
        const { product_name, price, quantity, description } =
          singleRecord;
        const data = {
          product_name,
          price,
          quantity,
          description,
        };
        reset(data);
      }
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Craft) => {
    if (id) {
      await dispatch(updateCraft({ ...data, _id: id }));
    } else {
      await dispatch(createCraft(data));
      reset();
      navigate("/Craft/list");
      AlertMessage('Customers Data Added Successfully','success');
    }
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px'}}> 
        <CraftForm
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

export default CraftAction;
