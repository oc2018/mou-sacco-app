import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles';
import formatDate from '../../utils/formatDate';
import ErrorAuth from '../ErrorAuth/ErrorAuth';


const initialState = {name: '', amount: '', datePaid:'', memberNo: '', email: ''}

const Form = ({ currentId, isEdit, setIsEdit, setIsEnterTransaction }) => {

    const classes = useStyles();
    const [postData, setPostData] = useState(initialState);
    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        messege: ""
    });
    
    
    const dispatch = useDispatch();
    
    const handleClear = () => {
        setPostData(initialState)
        setIsEdit(false);         
        setIsEnterTransaction(false);          
    }

    const post = useSelector((state) => currentId && isEdit ? state.posts.find((p) => p._id === currentId): null );

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isEdit){
            dispatch(updatePost(currentId, postData, setErrorHandler));
            
            handleClear();            
        }else{
            dispatch(createPost(postData, setErrorHandler));
            setTimeout(handleClear, 15000);
        }         
    }

    useEffect(() =>{
        if(post) setPostData(post);
    },[post])


    return(
        <Paper className={classes.paper}>
            <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} noValidate onSubmit={handleSubmit}>
            <Typography variant="h6" >{isEdit ? 'Edit' : 'Enter'} Transaction </Typography>
            <TextField name="memberNo" variant="outlined" label="Member Number" fullWidth value={postData?.memberNo} onChange={(e)=> setPostData({ ...postData, memberNo: e.target.value})}/>
            <TextField name="name" variant="outlined" label= "Name" fullWidth value={postData?.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
            <TextField name="email" variant="outlined" label="Email" fullWidth value={postData?.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
            <TextField name="amount" variant="outlined" label="Amount" fullWidth value={postData?.amount} onChange={(e) => setPostData({ ...postData, amount: e.target.value})} />
            < TextField type="date" name="datePaid" variant="outlined" label="" fullWidth value={postData?.datePaid} onChange={(e) => setPostData({ ...postData, datePaid: formatDate(e.target.value)})} />

            <Button className={classes.buttonSubmit} color="primary" variant="outlined" size="large" type="submit" fullWidth>Submit</Button>
            <Button color="secondary" variant="outlined" size="small" onClick={handleClear} fullWidth>Clear</Button>
            </form>

        </Paper>

)}

export default Form;