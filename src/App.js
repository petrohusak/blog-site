import Posts from "./components/Posts";
import ControlForm from "./components/ControlForm";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { loadAllData } from './redux/actions.js'
import './style.css'


const App =()=>{
  const [firstLoad, setFirstLoad] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(firstLoad === true){
      setFirstLoad(false)
      dispatch(loadAllData())      
    }
  })

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col">
          <ControlForm/>
        </div>
      </div>

      <div className="row allPosts">
        <div className="col">
          <Posts />
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = state => {
  return {
      props: state.allData,
  }
}

export default connect(mapStateToProps)(App);
