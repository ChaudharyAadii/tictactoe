// // import React from 'react';
// import React, { useEffect, useState } from 'react';
// import './Game.css';
// // import TicTac from './TicTac';

// export default function Game() {
//     // var boxes = ['', '', '', '', '', '', '', '', ''];

//     // const handleClick = (index) => {
//     //     var i = index;
//     //     console.log(i);
//     //     var ctr = 0;
//     //     if (ctr % 2 === 0) {
//     //         boxes.splice(index, 1, 'X');
//     //         console.log(boxes);
//     //         ctr = ctr + 1;
//     //     }
//     //     else{
//     //         boxes.splice(index, 1, 'O');
//     //         console.log(boxes);
//     //         ctr = ctr + 1;
//     //     }
//     // }

//     const [boxes, setBoxes] = useState(['', '', '', '', '', '', '', '', '']);
//     const [ctr, setCtr] = useState(0);
//     const [won, setWon] = useState(0);
//     const [refresh, setRefresh] = useState(false);

//     const handleClick = (index) => {
//         if (ctr % 2 === 0) {
//             const newBoxes = [...boxes];
//             newBoxes.splice(index, 1, 'X');
//             setBoxes(newBoxes);
//             setCtr(ctr + 1);
//             console.log(boxes);
//             setRefresh(!refresh);
//         } else {
//             const newBoxes = [...boxes];
//             newBoxes.splice(index, 1, 'O');
//             setBoxes(newBoxes);
//             setCtr(ctr + 1);
//             console.log(boxes);
//         }
//         check(newBoxes);
//     };

//     // const handleClick = (index) => {
//     //     if (!won && boxes[index] === '') {
//     //         const newBoxes = [...boxes];
//     //         newBoxes[index] = ctr % 2 === 0 ? 'X' : 'O';
//     //         setBoxes(newBoxes);
//     //         setCtr(ctr + 1);
//     //     }
//     // };

//     const check = () => {
//         if (ctr>=5 &&
//             ((boxes[0] === boxes[1] && boxes[0] === boxes[2]) ||
//                 (boxes[0] === boxes[3] && boxes[0] === boxes[6]) ||
//                 (boxes[2] === boxes[5] && boxes[2] === boxes[8]) ||
//                 (boxes[6] === boxes[7] && boxes[6] === boxes[8]) ||
//                 (boxes[0] === boxes[4] && boxes[0] === boxes[8]) ||
//                 (boxes[6] === boxes[4] && boxes[6] === boxes[2]))){
//             // (boxes[0] !== '' ||
//             //     boxes[1] !== '' ||
//             //     boxes[2] !== '' ||
//             //     boxes[3] !== '' ||
//             //     boxes[4] !== '' ||
//             //     boxes[5] !== '' ||
//             //     boxes[6] !== '' ||
//             //     boxes[7] !== '' ||
//             //     boxes[8] !== '')) {
//                 // setWon(won + 1);
//                 // setBoxes(['', '', '', '', '', '', '', '', '']);
//                 console.log("Won");
//                 // console.log(won);
//                 if(ctr%2 === 0){
//                     alert("PLayer with move O won");
//                 }
//                 else if(ctr === 8){
//                     alert("!!!!!.... Match TIE ....!!!!!")
//                 }
//                 else{
//                     alert("Player with move X won");
//                 }
//         }
        
//     }




//     // useEffect(() => {
//     //     check();
//     // },[])

//     // useEffect(() => {
//     //     check();
//     // }, [refresh, ctr]);

//     return (
//         <>
//             {/* <TicTac boxes={boxes} /> */}
//             <div className="grid">
//                 {Array.isArray(boxes) && boxes.map((element, index) => (
//                     <button onClick={() => handleClick(index)} key={index}><div className='girdDiv'>{element}</div></button>
//                 ))}
//             </div>
//         </>
//     )
// }


import React, { useState } from 'react';
import './Game.css';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [ctr, setCtr] = useState(0);

  const handleClick = (index) => {
    if (!winner && board[index] === '') {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
      setCtr(ctr + 1);
      checkWinner(newBoard);
      console.log(ctr);
    }
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        break;
      }
    }
    if(winner === null && ctr === 8){
      alert("!!!!....Game TIED....!!!!")
      resetGame();
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setPlayer('X');
    setWinner(null);
    setCtr(0);
  };

  return (
    <div className="tic-tac-toe">
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner-message">
          <p>{`Player ${winner} wins!`}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
