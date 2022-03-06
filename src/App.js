import { useState } from 'react';
import CalcBtn from './CalcBtn';
import './mystyle.css'

let history = []
let uniqueKey = 0;

function App() {
  function manageOperation(value, action) {
    switch(action) {
      case 'add digit':
        if (resultPushed) {
          console.log(value);
          updateOperator('');
          updatePreviousValue('');
          toggleRP(false);
          return updateCurrent(value);
        }
        else {
          if (currentValue === '0') {
            return updateCurrent(value)
          }
          else if ((value === '.') && currentValue.includes('.')) {
            return
          }
          else {
            return updateCurrent(currentValue + value)
          }
        }
      case 'clear':
        updateCurrent('0');
        updateOperator('');
        updatePreviousValue('');
        return
      case 'del':
        if (currentValue !== '0') {
          let aux = currentValue.slice(0, currentValue.length -1);
          if (!aux) {
            aux = '0'
          }
          updateCurrent(aux);
        }
        return
      case 'operator':
        if (currentValue !== '0') {
          evaluate();
          updateOperator(value);
        }
        else {
          if (previousValue) {
            updateOperator(value);
            if (resultPushed) {
              toggleRP(false);
            }
          }
        }
        return
      case 'result':
        if (currentValue && previousValue) {
          evaluate()
          toggleRP(true)
        }
        return
    }
  }

  function evaluate () {
    if(!previousValue) {
      updatePreviousValue(currentValue);
      updateCurrent('0')
      return
    }
      let realOperator;
      switch(operator) {
        case '×':
          realOperator = '*';
          break
        case '÷':
          realOperator = '/';
          break
        case '+':
        case '-':
          realOperator = operator;
      }
      if ((realOperator === '/') && (currentValue === '0')) {
        updateCurrent('Err');
        let storeOp = operator;
        updateOperator('');
        let storePV = previousValue;
        updatePreviousValue('')
        setTimeout(() => {
          updateCurrent('0');
          updateOperator(storeOp);
          updatePreviousValue(storePV);
        }, 500);
      }
      else {
        let aux = `${previousValue} ${realOperator} ${currentValue}`;
        aux = eval(aux);
        history.unshift(`${previousValue} ${operator} ${currentValue} = ${aux}`);
        updatePreviousValue(aux);
        updateCurrent('0');
        manageHistUpdate();
      }
  }

  function manageHistUpdate() {
    if (history.length > 10) {
      history.pop();
    }
    updateHistDivs(
      history.map(elem => {
        uniqueKey++
        return <div key={uniqueKey} style={{margin: 10}}>{elem}</div>
      })
    );
    console.log(history);
  }

  function handleExpand () {
      if (expandValue === '[+]') {
        updateExpand('[-]');
        toggleId('history');
      }
      else {
        updateExpand('[+]');
        toggleId('hidden');
      }
  }

  const [currentValue, updateCurrent] = useState('0');
  const [previousValue, updatePreviousValue] = useState('');
  const [operator, updateOperator] = useState('');
  const[histDivs, updateHistDivs] = useState('');
  const[expandValue, updateExpand] = useState('[+]')
  const [resultPushed, toggleRP] = useState(false)
  const [histId, toggleId] = useState('hidden')
    return (
      <div id='main-container'>
        <div id="calculadora">
          <div id="visor">
            <div id='currentValue'>{currentValue} {operator}</div>
            <div id='previousValue'>{previousValue}</div>
          </div>
          <CalcBtn char='AC' func={manageOperation}/>
          <CalcBtn char='DEL' func={manageOperation}/>
          <CalcBtn char='÷' func={manageOperation}/>
          <CalcBtn char='1' func={manageOperation}/>
          <CalcBtn char='2' func={manageOperation}/>
          <CalcBtn char='3' func={manageOperation}/>
          <CalcBtn char='+' func={manageOperation}/>
          <CalcBtn char='4' func={manageOperation}/>
          <CalcBtn char='5' func={manageOperation}/>
          <CalcBtn char='6' func={manageOperation}/>
          <CalcBtn char='-' func={manageOperation}/>
          <CalcBtn char='7' func={manageOperation}/>
          <CalcBtn char='8' func={manageOperation}/>
          <CalcBtn char='9' func={manageOperation}/>
          <CalcBtn char='×' func={manageOperation}/>
          <CalcBtn char='0' func={manageOperation}/>
          <CalcBtn char='.' func={manageOperation}/>
          <CalcBtn char='=' func={manageOperation}/>
        </div>
        <div id='hist-container'>
            <div>
              <a id='expand' href='#' onClick={() => handleExpand()}>{expandValue}</a>Historico
            </div>
            <div id={histId}>
              {histDivs}
            </div>
        </div>
    </div>
  );
}

export default App;
