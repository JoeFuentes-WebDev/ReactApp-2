import './App.css';
import { useState } from 'react'

const BOXES = {'1':null, '2':null, '3':null, '4':null, '5':null, '6':null, '7':null, '8':null, '9':null};
const playersSign = {'1': 'X', '0': 'O'};
const winnerSet = ['123', '456', '789', '147', '258', '369', '159', '357'];
const App = () => {
  const [boxes, setBoxes ] = useState(BOXES);
  const [ turns, setTurns ] = useState(0);
  const [ winner, setWinner ] = useState('');
  const [ playersHand, setPlayersHand ] = useState({'1':[], '0':[]});
  

  const TickTackToe = ({cssName}) => <div className={cssName}>
    {Object.keys(boxes).map((b, i) => <button key={i} id={b} onClick={mark}>{ BOXES[b] || ' '}</button>)}
    {playersHand['0'].sort()} / {playersHand['1'].sort()} 
    {winner && <h3> {winner} wins!</h3>}
  </div>

  const mark = (e) => {
    console.log(e.target.id);
    BOXES[e.target.id] = playersSign[turns%2];
    playersHand[turns%2].push(e.target.id);
    setPlayersHand({...playersHand})
    setBoxes({...BOXES}); 
    setTurns(turns + 1);
    if(turns >= 4) score()
  }

  const score = () => {
    //console.log('trying to score', p.length)
    let whoWins;
    Object.keys(playersHand).forEach((pl) => {
      playersHand[pl].forEach(p => {
        winnerSet.forEach(set => {
          set.split('').forEach(s => {
            console.log('trying to score', p.length)
            if (p.length >= 3 && p.includes(s)) whoWins = playersSign[pl]
          })
        });
      })
    });

    setWinner(whoWins)
  }

  return (
    <div className="App">
      <TickTackToe cssName='board' />
    </div>
  )}


export default App;
