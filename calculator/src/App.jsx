import "./App.css";
import CalculatorTable from "./component/calculatorTable";
import Button from "./component/button";
import Operator from "./component/operator";
import { useEffect, useReducer } from "react";

export const ACTION_TYPE = {
  ADD_DIGIT: "ADD",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE: "delete-digit",
  EVALUATE: "evaluate",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION_TYPE.ADD_DIGIT:
  if (state.overwrite) {
    return {
      ...state,
      currentOperand: payload.digit,
      overwrite: false,
    };
  }
  if (payload.digit =='0' && state.currentOperand =='0') {
    return state;
  }
  if (payload.digit == '.' && (state.currentOperand || '').includes('.')) {
    return state;
  }
  return {
    ...state,
    currentOperand: `${state.currentOperand || ''}${payload.digit}`,
  };

      case ACTION_TYPE.CHOOSE_OPERATION:
        if(state.currentOperand==null && state.previousOperand ==null){
          return state
        }
        if(state.currentOperand == null){
          return {
            ...state,
            operation:payload.operation,
          }
        }
        if(state.previousOperand == null){
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }
        return {
          ...state,
          operation: payload.operation,
          currentOperand:null,
          previousOperand: evaluate(state),
        }
        case ACTION_TYPE.DELETE:
          if (state.overwrite){
            return{
              ...state,
              overwrite:false,
              currentOperand:null,
            }
          }
          if (state.currentOperand == null) return state
          if (state.currentOperand.length === 1){
            return {...state,currentOperand:null}
          }
          return{
            ...state,
            currentOperand: state.currentOperand.slice(0,-1),
          }
          case ACTION_TYPE.EVALUATE:
            if(
              state.operation == null ||
              state.currentOperand == null||
              state.previousOperand == null
            ){
              return state
            }
            return {
              ...state,
              overwrite:true,
              previousOperand:null,
              currentOperand:evaluate(state),
              operation: null
            }
            case ACTION_TYPE.CLEAR:
              return {
                overwrite:true,
                previousOperand:null,
                currentOperand:null,
                operation: null
              }

    } 
}
function evaluate({currentOperand, previousOperand, operation}){
  const prev= parseFloat(previousOperand)
  const current= parseFloat(currentOperand)
  let computation=""
  switch (operation){
    case "+":
      computation = prev + current
      break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev*current
        break
      case "/":
        computation = prev/current
        break

  }
return computation.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (typeof operand !== 'string' || operand === null || operand === undefined) {
    return ''; 
  }
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  useEffect (()=>{
    console.log({ currentOperand, previousOperand, operation })
  })

  return (
    <>
      {/* <CalculatorTable/> */}
      <div className="grid">
        <div className="output">
          <div>
            {formatOperand(previousOperand)} {operation}
          </div>
          <div>{formatOperand(currentOperand)}</div>
        </div>
        <button className="ac-button" onClick={() => dispatch({ type: ACTION_TYPE.CLEAR })}>
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTION_TYPE.DELETE })}>
          DEL
        </button>
        <Operator operation={"+"} dispatch={dispatch} />
        <Button digit={9} dispatch={dispatch} />
        <Button digit={8} dispatch={dispatch} />
        <Button digit={7} dispatch={dispatch} />
        <Operator operation={"-"} dispatch={dispatch} />
        <Button digit={6} dispatch={dispatch} />
        <Button digit={5} dispatch={dispatch} />
        <Button digit={4} dispatch={dispatch} />
        <Operator operation={"/"} dispatch={dispatch} />
        <Button digit={3} dispatch={dispatch} />
        <Button digit={2} dispatch={dispatch} />
        <Button digit={1} dispatch={dispatch} />
        <Operator operation={"*"} dispatch={dispatch} />
        <Button digit="." dispatch={dispatch} />
        <Button digit={0} dispatch={dispatch} />
        <button  className="equal-button" onClick={() => dispatch({ type: ACTION_TYPE.EVALUATE })}>
          =
        </button>
      </div>
    </>
  );
}

export default App;
