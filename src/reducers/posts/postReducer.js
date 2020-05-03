import {type} from '../action/type'

export default (state=[], action) => {
    switch(action.type){
        case type.GET_POSTS:
            return action.payload;
        default:
            return state;
    }
}