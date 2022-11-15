import { AUTH, AUTH_ERROR } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData,history,setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.signin(formData);
        
        dispatch({ type: AUTH, data });
        
        history.push('/adminhome');
    } catch (error) {
    
        if(error?.response?.data?.message){
            dispatch({
                    type: AUTH_ERROR,
                    payload: error.response.data.message,
            });
            setErrorHandler({hasError:true, message:error?.response?.data?.message});
        }else{
            setErrorHandler({hasError:true, message: "The server can not be reached"});
        }
    }

}

export const signup = (formData, history,setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.signup(formData);
       
        dispatch({ type: AUTH, data });

        history.push('/adminhome');
    } catch (error) {        
        if(error.response.data.message){
            dispatch({
                    type: AUTH_ERROR,
                    payload: error.response.data.message,
            });
        }
        setErrorHandler({hasError:true, message: error.response?.data?.message});
    }
}