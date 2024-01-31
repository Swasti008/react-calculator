import React, { useState } from 'react'
import './calculator.css'

export default function calculatorTable() {
  const [type,setType] =useState('');
  const [type2,setType2] =useState('');

  const handleType=(input)=>{
    setType((prev)=>prev+input);
  }
  const handleOperator=(operator)=>{
    switch (operator){
        case "*":

            

    }
  }
  return (
    <div>
        <table className='tableContainer'>
            {/* <thead><tr><td>ans</td></tr></thead> */}
            <tbody>
            <tr className='first'>
            <td colSpan={4}>{type}</td>
            </tr>
            <tr>
                <td colSpan={2}><button style={{width:"163px"}}>AC</button></td>
                <td><button>DEL</button></td>
                <td><button onClick={()=>{handleType("+")}}>+</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>{handleType(2)}}>2</button></td>
                <td><button onClick={()=>{handleType(1)}}>1</button></td>
                <td><button onClick={()=>{handleType(3)}}>3</button></td>
                <td><button onClick={()=>{handleType("*")}}>*</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>{handleType(4)}}>4</button></td>
                <td><button onClick={()=>{handleType(5)}}>5</button></td>
                <td><button onClick={()=>{handleType(6)}}>6</button></td>
                <td><button>x</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>{handleType(7)}}>7</button></td>
                <td><button onClick={()=>{handleType(8)}}>8</button></td>
                <td><button onClick={()=>{handleType(9)}}>9</button></td>
                <td><button onClick={()=>{handleType("-")}}>-</button></td>
            </tr>
            <tr>
                <td><button>.</button></td>
                <td><button>0</button></td>
                <td colSpan={2}><button style={{width:"163px",backgroundColor:"blueviolet"}}>=</button></td>
            </tr>
            </tbody>

        </table>
    </div>
  )
}
