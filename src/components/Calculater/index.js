import "./Calculater.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  addInputValue,
  displayResult,
  clearInput,
  deleteInputValue,
  handleHistory,
} from "../../reducers/Calculater";

function Calculater() {
  const inputValue = useSelector((state) => state.calculater.inputValue);
  const result = useSelector((state) => state.calculater.result);
  const history = useSelector((state) => state.calculater.history);
  const checkHistory = useSelector((state) => state.calculater.checkHistory);

  const dispatch = useDispatch();
  const handleInput = (e) => {
    const innerText = e.target.innerText;
    if (e.target.className === "buttons") return;
    switch (innerText) {
      case "=":
        dispatch(displayResult(eval(inputValue)));
        break;
      case "DEL":
        if (!inputValue) return;
        dispatch(deleteInputValue(inputValue));
        break;
      case "History":
        dispatch(handleHistory());
        break;
      default:
        const lastInput = inputValue.slice(-1);

        if (
          (innerText === "%" || innerText === "*" || innerText === "/") &&
          (lastInput === "+" ||
            lastInput === "-" ||
            lastInput === "%" ||
            lastInput === "*" ||
            lastInput === "/")
        ) {
          return;
        }
        if (innerText === "+" && lastInput === "+") return;
        if (innerText === "-" && lastInput === "-") return;

        dispatch(addInputValue(innerText));
        break;
    }
  };

  const handleClearInput = () => {
    if (!inputValue && !result) return;
    dispatch(clearInput());
  };

  return (
    <div className="home">
      <div className="caculator">
        <div className="display">
          <div id="input">{inputValue}</div>
          <div id="result">{result}</div>
        </div>

        <div
          className="caculation buttons"
          onClick={(e) => {
            handleInput(e);
          }}
        >
          <button>History</button>
          <button>+</button>
          <button>-</button>
          <button>*</button>
          <button>/</button>
          <button
            onDoubleClick={(e) => {
              handleClearInput(e);
            }}
          >
            DEL
          </button>
        </div>
        <div
          className="digits buttons"
          onClick={(e) => {
            handleInput(e);
          }}
        >
          <button>9</button>
          <button>8</button>
          <button>7</button>
          <button>6</button>
          <button>5</button>
          <button>4</button>
          <button>3</button>
          <button>2</button>
          <button>1</button>

          <button>0</button>
          <button>.</button>
          <button>=</button>
        </div>
      </div>
      {checkHistory && (
        <div className="history">
          <h3>
            <center>History</center>
          </h3>
          {history.length > 0 &&
            history.map((item, index) => <p key={index}>{item}</p>)}
        </div>
      )}
    </div>
  );
}

export default Calculater;
