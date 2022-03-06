const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operands = ['+', '-', '÷', '×'];

export default function CalcBtn({func, char}) {
  return (
    digits.includes(char) ?
    <button onClick={() => func(char, 'add digit')}>{char}</button> :
    operands.includes(char) ?
    <button onClick={() => func(char, 'operator')}>{char}</button> :
    char === 'AC' ? 
    <button className='span-two' onClick={() => func(char, 'clear')}>{char}</button> :
    char === 'DEL' ?
    <button onClick={() => func(char, 'del')}>{char}</button> :
    <button className='span-two' onClick={() => func(char, 'result')}>{char}</button>
  )
}
