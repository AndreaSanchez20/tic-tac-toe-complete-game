import React, { useState } from "react";
import Cell from "./Cell";
import "./Game.css";

function Game(props) {
    const [board, setBoard] = useState([
        ["+", "+", "+"],
        ["+", "+", "+"],
        ["+", "+", "+"],
    ]);

    // function checkWinner(board, rowIdx, colIdx){
    //     const currentSymbol = board[rowIdx][colIdx];
    //     //check that row
    //     if(board[rowIdx][0] === currentSymbol &&
    //         board[rowIdx][1] === currentSymbol &&
    //         board[rowIdx][2] === currentSymbol
    //     )
    //     console.log(`${board[rowIdx][colIdx]} is winner`);

    //     //check that column
    //     if(board[colIdx][0] === currentSymbol &&
    //         board[colIdx][1] === currentSymbol &&
    //         board[colIdx][2] === currentSymbol
    //     )
    //     //check diagonals
    //     if(
    //        (rowIdx === colIdx &&
    //         board[0][0] === currentSymbol &&
    //         board[1][1] === currentSymbol &&
    //         board[2][2] === currentSymbol) ||
    //         (rowIdx + colIdx === 2 &&
    //             board[0][2] === currentSymbol &&
    //             board[1][1] === currentSymbol &&
    //             board[2][0] === currentSymbol
    //         )
    //     )
    //     console.log(`${board[rowIdx][colIdx]} is winner`);
    // }

    // function changeCellValue(rowIdx, colIdx){
    //     const newBoard = [...board];
    //     newBoard[rowIdx] = [...newBoard[rowIdx]];
    //     if(newBoard[rowIdx][colIdx] === "+") newBoard[rowIdx][colIdx] = "X";
    //     else if (newBoard[rowIdx][colIdx]==='X') newBoard[rowIdx][colIdx] = "O";
    //     else newBoard[rowIdx][colIdx] = "X";

    //     checkWinner(newBoard, rowIdx, colIdx);
    //     setBoard(newBoard);
    // }

    function checkWinner(board, rowIdx, colIdx) {
    const currentSymbol = board[rowIdx][colIdx];

    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === currentSymbol &&
            board[i][1] === currentSymbol &&
            board[i][2] === currentSymbol
        ) {
            props.setWinner(currentSymbol);
            return;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            board[0][i] === currentSymbol &&
            board[1][i] === currentSymbol &&
            board[2][i] === currentSymbol
        ) {
            props.setWinner(currentSymbol);
            return;
        }
    }

    // Check diagonals
    if (
        (rowIdx === colIdx &&
            board[0][0] === currentSymbol &&
            board[1][1] === currentSymbol &&
            board[2][2] === currentSymbol) ||
        (rowIdx + colIdx === 2 &&
            board[0][2] === currentSymbol &&
            board[1][1] === currentSymbol &&
            board[2][0] === currentSymbol)
    ) {
        props.setWinner(currentSymbol);
        return;
    }

    // Check for draw
    let draw = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "+") {
                draw = false;
                break;
            }
        }
    }

    if (draw) props.setWinner("Draw");
}

function changeCellValue(rowIdx, colIdx) {
    if (props.winner || board[rowIdx][colIdx] !== "+") return;

    const newBoard = board.map((row) => [...row]);
    newBoard[rowIdx][colIdx] = props.xIsNext ? "X" : "O";

    setBoard(newBoard);
    props.setXIsNext(!props.xIsNext);
    checkWinner(newBoard, rowIdx, colIdx);
}

    return (
        <div className="gameWrapper">
            {board.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} className="rowWrapper">
                        {row.map((col, colIdx) => {
                            return <Cell key={colIdx} value={col} onClick={changeCellValue.bind(null, rowIdx, colIdx)} />;
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Game;