import { FETCH_ALL, FETCH, DELETE, UPDATE, CREATE, FETCH_BY_SEARCH, AUTH_ERROR } from '../constants/actionTypes'
import * as api from '../api';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data});
      
    } catch (error) {
        console.log(error);
    }
    
}

export const getPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH, payload: data })
        
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    
        dispatch({ type: FETCH_BY_SEARCH , payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost= (post, setErrorHandler) => async (dispatch) => {
  
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {

        if(error?.response?.data?.message){
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.message,
            }) 
            
            setErrorHandler({ hasError: true, message: error?.response?.data?.message });
        }else{
            setErrorHandler({ hasError: true, message: error.message});
        }
    }


}

export const updatePost = (id, post, setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data })
        
    } catch (error) {

        if(error?.response?.data?.message){
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.message,
            }) 
            
            setErrorHandler({ hasError: true, message: error?.response?.data?.message });
        }else{
            setErrorHandler({ hasError: true, message: error.message});
        }
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
         await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
        
    } catch (error) {

        console.log(error);
    }
}