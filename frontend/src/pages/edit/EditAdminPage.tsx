import ValidationSchema from "../../Validation/AdminSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../store/useDispatch";
import { useSelector } from "react-redux";
import EditAdminForm from "../../components/organisms/editForm/EditAdmin";
import { fetchAdminById, updateAdmin } from "../../store/admin/AdminSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export type Admin = {
  _id?: string;
  first_name: string;
  user_name: string;
  email: string;
  password: string;
}

export type AdminList = {
  data: string[];
  loading:boolean;
  message:string;
  error?:string;
  singleRecord: Admin;
}

export type StateValue = {
  admins: AdminList;
}

const EditAdminPage = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { singleRecord } = useSelector(
    (state: StateValue) => state.admins || {}
  );

  //validate
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    //setError,
  } = useForm<Admin>({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      first_name: "",
      user_name: "",
      email: "",
      password: "",
    },
  });

//get details
  useEffect(() => {

    console.log({id});
    if (id) {
      dispatch(fetchAdminById(id))
        .then(unwrapResult)
        .then((data) => {

if (singleRecord) {

  const { first_name, user_name, email, password } = data;
  const dataa = {
    first_name,
    user_name,
    email,
    password,
  };
  reset(dataa);
}
        })
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

  
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Admin) => {
    if (id) {
      await dispatch(updateAdmin({ ...data, _id: id }));
      reset();
      navigate("/dashboard");
      AlertMessage('updated Successfully','success');
    } 
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px'}}> 
        <EditAdminForm
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

export default EditAdminPage;
