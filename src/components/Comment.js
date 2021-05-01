import React from 'react'

const Comment = ({comments})=>{
    return(
        <div className="card">
            <div className="card-body">                
                <div className="card-title">User with nickname: <b>{comments.name}</b> writes:</div>
                <div className="card-title">{comments.body}</div>
            </div>

        </div>
    )
}

export default Comment;