import React from 'react'
import {connect} from 'react-redux'
import Comment from './Comment'

const Comments = ({props, allComments, allPosts})=>{
    return allComments.filter(el=> el.postId === props)
    .map(comment => <Comment comments={comment} key={comment.id}/>)
}

const mapStateToProps = state => {
    return {
        allComments: state.allData.comments,
        allPosts: state.allData.posts,
    }
}

export default connect(mapStateToProps)(Comments);