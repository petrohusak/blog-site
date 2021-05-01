import { CHANGE_ACCESS, LOAD_ALL_DATA, DELETE_POST, REBUILD_STATE, SET_SORT_TYPE } from "./types";

export function addPost(newPost){
    return dispatch=>{
        let posts = JSON.parse(localStorage.getItem('posts'))
        posts = [newPost, ...posts]
        dispatch({type: REBUILD_STATE, payload: posts,})
        localStorage.setItem('posts', JSON.stringify(posts))
    }
}

export function changeAccess(){
    return {
        type: CHANGE_ACCESS,
    }
}

export function loadAllData(){
    return async dispatch =>{
        if(localStorage.getItem('posts')===null){
            const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts/')
            const postsJson = await postsResponse.json()
            const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments/ ')
            const commentsJson = await commentsResponse.json()
            for(let i=0; i< postsJson.length;i++){
                let counter = 0
                for(let j=0;j< commentsJson.length;j++){
                    if(commentsJson[j].postId === postsJson[i].id){
                        counter++
                    }
                }
                postsJson[i].numberOfComments = counter
                postsJson[i].numberOfViews = 0
            }

            dispatch({type: LOAD_ALL_DATA, posts: postsJson, comments: commentsJson})
            localStorage.setItem('posts', JSON.stringify(postsJson))
            localStorage.setItem('comments', JSON.stringify(commentsJson))
        } else {
            let posts = JSON.parse(localStorage.getItem('posts'))
            let comments = JSON.parse(localStorage.getItem('comments'))
            dispatch({type: LOAD_ALL_DATA, posts: posts, comments: comments})
        }
                
    }
}

export function deletePost(id){
    return dispatch=>{
        dispatch({type: DELETE_POST, payload: id,})
        dispatch({type: DELETE_POST, payload: id,})
    }
}

export function addView(id){
    return dispatch =>{
        let posts = JSON.parse(localStorage.getItem('posts'))
        for(let i = 0; i< posts.length;i++){
            if(posts[i].id === id){
                posts[i].numberOfViews++
            }
        }
        dispatch({type: REBUILD_STATE, payload: posts})
        localStorage.setItem('posts', JSON.stringify(posts))
    }
}

export function setSortType(sortBy, id=0){
    return {
        type: SET_SORT_TYPE,
        payload: sortBy,
        forIdSort: id,
    }
}