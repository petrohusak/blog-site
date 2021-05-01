import React, { useState } from 'react'
import Modal from './../modal/Modal';
import {connect} from 'react-redux'
import Comments from './Comments'
import { useDispatch } from 'react-redux';
import { addPost, addView, deletePost } from '../redux/actions';
import './styles.css'


const Post = ({posts, isAdmin})=>{
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()
    const [editOrViewField, setEditOrViewField] = useState(true)
    let newTitle = ''
    let newBody = ''

    const editField = (<div className="editField">
        <div><br />Enter new title:</div>
        <input className="inputTitleField" type='text' onChange={(e)=>newTitle=e.target.value}></input>
        <div><br />Enter new post body:</div>
        <textarea className="inputEditBodyField" type='text' onChange={(e)=>newBody=e.target.value}></textarea>
        <button className="btn btn-secondary confirmEditButton" onClick={editPost}>Confirm</button>
    </div>)

    const viewField =(<div>
        <div><b>Number of view:</b> {posts.numberOfViews}</div>
        <div><b>Title:</b> {posts.title}</div>
        <div><b>Body:</b> {posts.body}</div>
        <div><b>Comments to the post:</b></div>
        <Comments props={posts.id}/>
    </div>)

    function openModalWindow(){
        setModalActive(true)
        dispatch(addView(posts.id))
        localStorage.setItem('currentId', JSON.stringify(posts.id))
    }

    function editButtonPressed(){
        setEditOrViewField(false)
        setModalActive(true)
    }

    function editPost(){        
        dispatch(deletePost(JSON.parse(localStorage.getItem('currentId'))))
        dispatch(addPost({
            userId: parseInt(posts.userId),
            id: JSON.parse(localStorage.getItem('currentId')),
            title: newTitle,
            body: newBody,
            numberOfComments: 0,
            numberOfViews: posts.numberOfViews,
        }))
        setModalActive(false)
        setEditOrViewField(true)        
    }

    function deleteCurrentPost(){
        dispatch(deletePost(JSON.parse(localStorage.getItem('currentId'))))
    }

    return(
        <div className="card">
            <div className="card-body" onMouseOver={()=>localStorage.setItem('currentId', JSON.stringify(posts.id))}>                
                <h4 className="card-title">{posts.title}</h4>
                <div>Number of views: {posts.numberOfViews}</div>
                <button className="btn btn-secondary" onClick={openModalWindow}>Show more</button>
            </div>
            
            {isAdmin ? (<div className="editDeletePostButtons">
                    <button className="btn btn-secondary editPostButton" onClick={editButtonPressed}>Edit post</button> 
                    <button className="btn btn-secondary deletePostButton" onClick={deleteCurrentPost}>Delete post</button>
                    </div>) : (' ')}

            {editOrViewField ? (<Modal active={modalActive} setActive={setModalActive}>{viewField}</Modal>                    
                ) : (<Modal active={modalActive} setActive={setModalActive}>{editField}</Modal>)}
                       
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allComments: state.allData.comments,
        isAdmin: state.allData.isAdmin,
    }
}

export default connect(mapStateToProps)(Post);