import ValidationSchema from "../Validation/AdminLoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../store/useDispatch";
import { useSelector } from "react-redux";
import AdminForm from "../components/organisms/login/AdminForm";
import { fetchAdminById} from "../store/adminLogin/AdminSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export type Admin = {
  _id?: string;
  user_name: string;
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
  admins: AdminList
}

const AdminLogin = () => {
  
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
  } = useForm<Admin>({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

//get details
  useEffect(() => {
    if (id) {
      dispatch(fetchAdminById(id))
        .then(unwrapResult)
        .then((data) => {})
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

      if (singleRecord) {
        const { user_name, password } =
          singleRecord;
        const data = {
          user_name,
          password,
        };
        reset(data);
      }
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Admin) => {
    if (id) {
    } else {
      reset();
      navigate("/dashboard");
      AlertMessage('Admin Logged Successfully','success');
    }
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px', width:'600px'}}> 
        <AdminForm
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

export default AdminLogin;
