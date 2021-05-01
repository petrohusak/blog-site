import React, { useRef } from 'react'
import {connect} from 'react-redux'
import Modal from '../modal/Modal'
import { useDispatch } from 'react-redux';
import {addPost, changeAccess, setSortType } from './../redux/actions.js'
import {useState} from 'react'
import './styles.css'

const ControlForm = ({props, isAdmin})=>{

    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState(false);
    let newTitle = 'asd'
    let newBody = 'gfdh'
    let newUserId = Date.now
    let selectedId = 1
    const setIdField = useRef(null)

    function changeUserAccess(){
        dispatch(changeAccess())
    }
    
    function sortByComments(){
        dispatch(setSortType('byComments'))
    }

    function sortByViews(){
        dispatch(setSortType('byViews'))
    }

    function sortByDate(){
        dispatch(setSortType('byDate'))
    }

    function createPost(){
        setModalActive(true)
    }

    function sortById(){
        if(!parseInt(selectedId)){
            dispatch(setSortType('noSort'))
        } else{
            dispatch(setSortType('byId', parseInt(selectedId)))
            setIdField.current.value=''
        }
    }

    function closeAddField(){
        dispatch(addPost({
            userId: parseInt(newUserId),
            id: Date.now(),
            title: newTitle,
            body: newBody,
            numberOfComments: 0,
            numberOfViews: 0,
        }))
        setModalActive(false)
    }

    const adminField = (
    <div className='adminField col position-relative'>
        <button className="btn btn-secondary addPostButton" onClick={createPost}>Add post</button>
        <center><input type="text" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" className="form-control col postIdInput" ref={setIdField} onChange={(e)=>selectedId=e.target.value}></input></center> 
        <button className="btn btn-secondary col sortByIdButton" onClick={sortById}>Display the posts of chosen user</button>
    </div>

    )
    return(
        <div className="controlPanel row">
            <div className="changeUserAccessButton changeAccessDiv">        
                <button className="btn btn-secondary col changeAccessButton" onClick={changeUserAccess}>{isAdmin ? ('I am guest'):('I am admin')}</button>
            </div> 

            {isAdmin ? (adminField):('')}
            
            <div className="sortButtonsField row">
                <div className="sortByComments col">        
                    <button className="btn btn-secondary sortButton col" onClick={sortByComments}>Sort by the number of comments</button>
                </div>

                <div className="sortByViews col">        
                    <button className="btn btn-secondary sortButton" onClick={sortByViews}>Sort by the number of views</button>
                </div>

                <div className="sortByDate col">        
                    <button className="btn btn-secondary sortButton" onClick={sortByDate}>Sort by date</button>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="addField">
                    <div><br />Enter author id:</div>
                    <input className="inputIdField" type='text' onChange={(e)=>newUserId=e.target.value}></input>
                    <div><br />Enter new title:</div>
                    <input className="inputTitleField" type='text' onChange={(e)=>newTitle=e.target.value}></input>
                    <div><br />Enter new post body:</div>
                    <textarea className="inputBodyField" onChange={(e)=>newBody=e.target.value}></textarea>
                    <br /><button className="btn btn-secondary col confirmButton" onClick={closeAddField}>Confirm</button>
                </div>            
            </Modal>
        </div>
    )    
}

const mapStateToProps = state => {
    return {
        props: state.allData.posts,
        isAdmin: state.allData.isAdmin,
    }
}

export default connect(mapStateToProps)(ControlForm);