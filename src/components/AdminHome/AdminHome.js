import React, { useState, useEffect } from "react";
import { Grow, Container, Grid, TextField, Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom';

import Form from "../Form/Form";
import Navbar from "../Navbar/Navbar";
import Transaction from "../Transaction/Transaction";
import Transactions from "../Transactions/Transactions";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AdminHome = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [ isEdit, setIsEdit ] = useState();
    const [ isViewDetails, setIsViewDetails ] = useState(false);
    const [ isEnterTransaction, setIsEnterTransaction ] = useState(false); 
    const [ currentId, setCurrentId ] = useState();
    const [search, setSearch ] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));

    
    const query = useQuery();
    const searchQuery = query.get('searchQuery'); 
    console.log(searchQuery);

    useEffect(() => {
        dispatch(getPosts())
    },[dispatch]);

    const handleSearch = () => {
        if(search.trim()) {
            dispatch(getPostsBySearch({ search }));
            history.push(`/search?searchQuery=${search || 'none'}`);            
        } else {
            history.push('/adminhome');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            handleSearch();
        }
    }
    
    const enterTransaction = () => {
        setIsViewDetails(false)
        setIsEnterTransaction(true)
    }

    const isAdmin = user.result.role === "admin";
    return(
        <>
        <Navbar />
        <Grow in>
                <Container>
                    
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        {
                            isAdmin && 
                        <>
                        <Grid item xs={12} sm={3}>                            
                            <Grid item xs={12} sm={12} >                      
                                <TextField                              
                                   name="search"
                                   variant="outlined"
                                   label="search member number"
                                   fullWidth
                                   value={search}
                                   onKeyPress={handleKeyPress}
                                   onChange={(e) => setSearch(e.target.value)}
                                   />
                                <Button variant='outlined' color='primary' fullWidth onClick={ handleSearch } >Search</ Button>                 
                            </Grid>
                        
                      
                        <Button className={classes.button} variant="outlined" fullWidth onClick={ enterTransaction }>Enter Transaction</Button>
                        
                        </Grid>
                        </>
                        }
                        <Grid classsName={classes.container} Container item xs={12} sm={ isAdmin ? 9 : 12}>
                        { isAdmin &&
                        <>
                            <Grid item xs={12} sm={12} >
                            
                                { isViewDetails && 
                                    <Transaction currentId={currentId} setIsEdit={setIsEdit} setIsViewDetails={setIsViewDetails} setIsEnterTransaction={setIsEnterTransaction}  />
                                }
                            </Grid>
                        
                            <Grid item xs={12} sm={12}>
                                { isEnterTransaction &&
                                    <Form currentId={currentId} isEdit={isEdit} setIsEdit={setIsEdit}  setIsEnterTransaction={setIsEnterTransaction} />
                                }
                            </Grid>
                        </>
                        }
                            <Grid item xs={12} sm={12}>
                                <Transactions setCurrentId={setCurrentId} setIsEdit={setIsEdit} setIsViewDetails={setIsViewDetails} />
                            </Grid>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default AdminHome;