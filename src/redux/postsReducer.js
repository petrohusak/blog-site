import { ADD_POST, CHANGE_ACCESS, DELETE_POST, LOAD_ALL_DATA, REBUILD_STATE, SET_SORT_TYPE } from "./types"

const initialState = {
    posts : [
        {
            userId: 1,
            id: 1,
            title: 'Error!',
            body: 'Posts did not load.',
        }],
    isAdmin: false, 
    comments:[
        {
            postId:1,
            id: 1,
            name: 'asdasd',
            email: 'sdfxcv',
            body: 'adxcvgfdh',
        }
    ]        
}

export const postsReducer = (state = initialState, action)=>{
    switch (action.type){
        case ADD_POST:
            return {
                ...state, posts: [action.payload, ...state.posts]
            }
        case CHANGE_ACCESS:
            return {
                ...state, isAdmin: !state.isAdmin
            }
        case LOAD_ALL_DATA:
            return {
                ...state, posts: action.posts, comments: action.comments, isAdmin: false, sortBy: 'noSort',
            }
        case DELETE_POST:
            localStorage.removeItem('posts')
            localStorage.setItem('posts', JSON.stringify(state.posts))
            return {
                ...state, posts: state.posts.filter(el => el.id !== action.payload)
            }
        case REBUILD_STATE:
            return {
                ...state, posts: action.payload
            }
        case SET_SORT_TYPE:
            return {
                ...state, sortBy: action.payload, chosenId: action.forIdSort,
            }
        default: return state
    }

}