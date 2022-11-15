import React, { useState } from "react";
import { Avatar, Paper, Grid, Typography, Container, Button } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { signup, signin } from '../../actions/auth';
import useStyles from './styles'
import Input from "./Input";
import ErrorAuth from "../ErrorAuth/ErrorAuth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role: '' };

const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    
    const [isSignup, setIsSignup] = useState(false);
        
    

    const [ errorHandler, setErrorHandler ] = useState({
        hasError: false,
        message: ""
    });

    const [formData, setFormData] = useState(initialState);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history, setErrorHandler));
        }else{
            dispatch(signin(formData, history, setErrorHandler));
        }
        
        setFormData(initialState);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => prevIsSignup = !prevIsSignup);
        setShowPassword(false);
    }



    return(
        <Container component="main" maxWidth="xs">
           <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> 
                <Typography variant="h5">{isSignup ? 'Create User' : 'LogIn'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                       
                        {
                            
                            isSignup && (
                                <>
                                 <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                 <Input name="lastName" label="Other Names" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} /> 
                        

                        {
                            isSignup && <>
                            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                          
                            </>
                        }
                        
                    </Grid>
                    <Button fullWidth className={classes.submit} type="submit" variant="outlined" color="primary">{isSignup ? 'Create User' : 'Login'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                           
                    <Button onClick={switchMode} color="primary" > {isSignup ? "Login" : "signup"} </Button>
                        
                        
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;