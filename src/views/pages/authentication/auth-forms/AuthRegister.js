import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { Formik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import * as Yup from 'yup';
import MyPopup from '../MyPopup';
import './AuthLogin.css';

const FirebaseRegister = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(true);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const userData = {
        username: values.username,
        password: values.password,
        first_name: values.fname,
        last_name: values.lname,
        email: values.email,
        organization: values.organization
      };

      const response = await axios.post(`${process.env.REACT_APP_AUTOMATE}/signup`, JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setRegisterSuccess(true);
        toast.success("User created successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          theme: "colored",
        });

        setTimeout(() => {
          setRegisterSuccess(false);
        }, 3000);
        navigate('/login');
      } else {
        console.error('Registration failed');
        toast.error("Failed to create new user.", {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to create new user.", {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        theme: "colored",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <Grid container direction="column" justifyContent="center" spacing={0}>
        <Grid item xs={12} spacing={0}>
          <Button
            disableElevation
            fullWidth
            size="large"
            variant="outlined"
            sx={{
              color: 'grey.700',
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100]
            }}
          >
            Sign up with Google
          </Button>
        </Grid>
        <Grid item xs={12} spacing={0}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1, mt: -5, mb: -5 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mt: -1, mb: 0 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          username: '',
          password: '',
          fname: '',
          lname: '',
          email: '',
          organization: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          password: Yup.string().max(255).required('Password is required'),
          fname: Yup.string().required('First Name is required'),
          lname: Yup.string().required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          organization: Yup.string().required('Organization is required')
        })}
        onSubmit={handleRegister}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.fname && errors.fname)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-fname">First Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-fname"
                type="text"
                name="fname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fname}
              />
              {touched.fname && errors.fname && (
                <FormHelperText error id="standard-weight-helper-text-fname">
                  {errors.fname}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.lname && errors.lname)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-lname">Last Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-lname"
                type="text"
                name="lname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lname}
              />
              {touched.lname && errors.lname && (
                <FormHelperText error id="standard-weight-helper-text-lname">
                  {errors.lname}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.organization && errors.organization)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-organization">Organization</InputLabel>
              <OutlinedInput
                id="outlined-adornment-organization"
                type="text"
                name="organization"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.organization}
              />
              {touched.organization && errors.organization && (
                <FormHelperText error id="standard-weight-helper-text-organization">
                  {errors.organization}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                type="text"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Button className='sign-in-button' disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </form>
        )}
      </Formik>

      {registerSuccess && (
        <div className="success-popup">
          <MyPopup />
        </div>
      )}
    </>
  );
};

export default FirebaseRegister;
