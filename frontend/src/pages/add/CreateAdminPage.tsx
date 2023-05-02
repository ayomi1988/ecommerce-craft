import ValidationSchema from "../../Validation/AdminSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {AlertMessage} from '../../components/atoms/Alerts';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../store/useDispatch";
import { useSelector } from "react-redux";
import AdminForm from "../../components/organisms/addForm/AdminForm";
import { fetchAdminById, createAdmin, updateAdmin } from "../../store/admin/AdminSlice";
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
  admins: AdminList
}

const AdminAction = () => {
  
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
    setError,
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
    if (id) {
      dispatch(fetchAdminById(id))
        .then(unwrapResult)
        .then((data) => {})
        .catch((obj) => {
          AlertMessage('Something Went Wrong','error');
        });

      if (singleRecord) {
        const { first_name, user_name, email, password } =
          singleRecord;
        const data = {
          first_name,
          user_name,
          email,
          password,
        };
        reset(data);
      }
    }
  }, [dispatch, id, reset]);

  const onSubmit = async (data: Admin) => {
    if (id) {
      await dispatch(updateAdmin({ ...data, _id: id }));
    } else {
      await dispatch(createAdmin(data));
      reset();
      navigate("/Admin/list");
      AlertMessage('Admin Data Added Successfully','success');
    }
  };

  return (
    <Grid container spacing={2}>
        
      <Container sx={{marginTop: '60px'}}> 
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

export default AdminAction;
