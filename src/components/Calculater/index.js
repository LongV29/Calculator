import './Calculater.css'
import { useSelector, useDispatch } from 'react-redux'
import { addInputValue, displayResult, clearInput, deleteInputValue, handleHistory } from '../../reducers/Calculater'

function Calculater() {
  const inputValue = useSelector(state => state.calculater.inputValue)
  const result = useSelector(state => state.calculater.result)
  const history = useSelector(state => state.calculater.history)
  const checkHistory = useSelector(state => state.calculater.checkHistory)

  const dispatch = useDispatch()
  const handleInput = (e) => {
    const innerText = e.target.innerText;
    if (e.target.className === "buttons") return;
    if (innerText === '=') {
      dispatch(displayResult(eval(inputValue)))
      return;
    }
    if (innerText === 'AC') {
      if (!inputValue) return;
      dispatch(deleteInputValue(inputValue))
      return;
    }
    if (innerText === 'History') {
      dispatch(handleHistory())
      return;
    } else {
      const lastInput = inputValue.slice(-1)

      if ((innerText ==='%'
      || innerText === '*'
      || innerText === '/')
      && (lastInput === '+'
      || lastInput ==='-'
      || lastInput ==='%'
      || lastInput === '*'
      || lastInput === '/')
      ) {
        return;
      }
      if ((innerText ==='+') && (lastInput === '+')) return;
      if ((innerText ==='-') && (lastInput === '-')) return;
      
      dispatch(addInputValue(innerText))
    }
  }

  const handleClearInput = () => {
    if (!inputValue && !result) return;
    dispatch(clearInput())
  }

  return (
    <div className='container'>
      <div className="calculator">
        <div className="wrapper">
          <div id="input">{inputValue}</div>
          <div id="result">{result}</div>
        </div>
        <div className="buttons" onClick={(e)=> {handleInput(e)}}>
          <div>History</div>
          <div>%</div>
          <div onDoubleClick={handleClearInput}>AC</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>/</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>*</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>-</div>
          <div>0</div>
          <div>.</div>
          <div>=</div>
          <div>+</div>
        </div>
      </div>
      {
        checkHistory && <div className='history'>
          <h3><center>History</center></h3>
          {
            history.length > 0 && history.map((item,index)=>(
              <p key={index}>{item}</p>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Calculater;