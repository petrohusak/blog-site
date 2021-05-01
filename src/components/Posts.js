import React from 'react'
import {connect} from 'react-redux'
import Post from './Post'

const Posts = ({allPosts, sortBy, chosenId})=>{
    switch(sortBy){
        case 'noSort':
            return allPosts.map(post => <Post posts={post} key={post.id}/>)
        case 'byComments':
            return allPosts.sort((postA, postB) =>postB.numberOfComments - postA.numberOfComments).map(post => <Post posts={post} key={post.id}/>)
        case 'byViews':
            return allPosts.sort((postA, postB) =>postB.numberOfViews - postA.numberOfViews).map(post => <Post posts={post} key={post.id}/>)
        case 'byDate':
            return allPosts.sort((postA, postB) =>postB.id - postA.id).map(post => <Post posts={post} key={post.id}/>)
        case 'byId':
            return allPosts.filter(post =>post.userId === chosenId).map(post => <Post posts={post} key={post.id}/>)
        default:
            return allPosts.map(post => <Post posts={post} key={post.id}/>)

    }

}

const mapStateToProps = state => {
    return {
        allPosts: state.allData.posts,
        sortBy: state.allData.sortBy,
        chosenId: state.allData.chosenId,
    }
}

export default connect(mapStateToProps)(Posts);