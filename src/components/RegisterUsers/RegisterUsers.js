import React, { useState } from "react";
import { Avatar, Paper, Grid, Typography, Container, Button } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { signup } from '../../actions/auth';
import useStyles from './styles.js'
import Input from "../Auth/Input";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role: '' };

const RegisterUsers = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    

    const [formData, setFormData] = useState(initialState);
   
    const handleSubmit = (e) => {
        e.preventDefault();
       
        dispatch(signup(formData, history));

        setFormData(initialState);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    return(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Create User</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>                       
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} />                      
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        <Input name="role" label="Role" handleChange={handleChange} fullWidth />                
                    </Grid>
                    <Button fullWidth className={classes.submit} type="submit" variant="outlined" color="primary">Create User
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default RegisterUsers;