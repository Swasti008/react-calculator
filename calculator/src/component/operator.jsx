import React from 'react'
import { ACTION_TYPE } from '../App'

export default function Operator({dispatch,operation}) {
  return (
   <button onClick={()=>dispatch({type:ACTION_TYPE.CHOOSE_OPERATION,payload:{operation}})}>{operation}</button>
  )
}
