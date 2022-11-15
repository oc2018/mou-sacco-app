import React, { useState, useEffect } from 'react';
import  Alert  from '@material-ui/lab/Alert';

import useStyles from './styles';

const ErrorAuth = ({errorHandler, setErrorHandler }) => {
    
    const classes = useStyles();
    const [ show, setShow ] = useState(false);

    useEffect(() => {
            setShow(false);
        if(errorHandler.hasError){
            setShow(true);  
        }  
    }, [errorHandler])

    return (
        <div>
        {show ? 
            <>
            <div className={classes.container}>

                <Alert onClose={()=>{setShow(false) && setErrorHandler({hassError: false,message: ""})}} severity='error' className={classes.alert}>{errorHandler.message}</Alert>
                
            </div>
            </>
        : ""}
        </div>
    )
}

export default ErrorAuth
