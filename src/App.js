import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth';
//import ErrorAuth from './components/ErrorAuth/ErrorAuth';
import AdminHome from './components/AdminHome/AdminHome';
import RegisterUsers from './components/RegisterUsers/RegisterUsers';
import Form from './components/Form/Form';


const App = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));
    
    
    return(
        
        <BrowserRouter>
            <Container maxWidth="xl">            
                <Switch>
                    <Route path="/" exact component={() => (!user ? <Auth/> : <Auth />) } />
                    <Route path="/adminhome" exact component={AdminHome} />
                    <Route path="/search" exact component={AdminHome} />
                    <Route path="/adduser" exact component={RegisterUsers} />
                    <Route path="/form" exact component={Form} />
                </Switch>             
            </Container>
        </BrowserRouter>
    )
}

export default App;