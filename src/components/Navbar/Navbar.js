import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

import logo from '../../assets/logo.png';
import logoSmall from '../../assets/logo-small.png';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        
        history.push('/');
        setUser(null);
    };
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile'))); 
    },[location]);

    

    
    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <img className={classes.image} alt="logo" height="40px" src={logoSmall}  srcSet={`${logoSmall} 300w, ${logoSmall} 768w, ${logo} 1280w, ${logo} 3200w`} />
               
            </div>
                <Toolbar className={classes.toolbar}>
                    { user?(
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="outlined" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>                           
                        </div>
                    ) : (
                        <div>
                            <Button component={Link} to="/" variant="outlined" color="primary">Login</Button>
                        </div>
                    )}
                </Toolbar>

        </AppBar>

    )
}

export default Navbar;