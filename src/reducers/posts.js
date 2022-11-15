/* eslint-disable import/no-anonymous-default-export */
import { UPDATE, FETCH, FETCH_ALL, CREATE, DELETE, FETCH_BY_SEARCH } from "../constants/actionTypes";
    export default (posts= [], action) => {
      switch(action.type){
        case FETCH_BY_SEARCH:
            return action.payload;
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH:
            return action.payload;
            
        case FETCH_ALL:
            return action.payload;     
           
        case CREATE:
            return [...posts, action.payload];
        
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
    
        default:
            return posts; 
    }
}