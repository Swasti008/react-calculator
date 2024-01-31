import React from 'react'
import { ACTION_TYPE } from '../App'

export default function button({dispatch,digit}) {
  return (
   <button onClick={()=>dispatch({type:ACTION_TYPE.ADD_DIGIT,payload:{digit}})}>{digit}</button>
  )
}
