import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [quantityLands, setQuantity] = useState(0);
  
  const changeRow = (e) => {
    setRows(parseInt(e.target.value));
  };

  const changeColumn = (e) => {
    setColumns(parseInt(e.target.value));
  };

  const createMatrix = () => {
    const newMatrix = [];
    for (let i = 0 ; i < rows ; i++){
      const rows = [];
      for (let j = 0 ; j < columns ; j++) {
        const randomValue = Math.random() < 0.5 ? "W" : "L";
        rows.push(randomValue);
      }
      newMatrix.push(rows);
    }
    setMatrix(newMatrix);
    const quantityLands = counterLands(newMatrix);
    setQuantity(quantityLands);
  }

  const counterLands = (newMatrix) => {
    if (newMatrix.length === 0) {
      return 0;
    }

    const rowsF = newMatrix.length;
    const columnsF = newMatrix[0].length;
    const visited = Array(rowsF).fill(false).map(() => Array(columnsF).fill(false));

    let quantityLands = 0;

    const explorarIslas = (row, column) => {
      if (row < 0 || row >= rowsF || column < 0 || column >= columnsF || visited[row][column] || newMatrix[row][column] === "W") {
        return;
      }

      visited[row][column] = true;

      explorarIslas(row - 1, column); // Up
      explorarIslas(row + 1, column); // Down
      explorarIslas(row, column - 1); // Left
      explorarIslas(row, column + 1); // Right
    };

    for (let i = 0; i < rowsF; i++) {
      for (let j = 0; j < columnsF; j++) {
        if (newMatrix[i][j] === "L" && !visited[i][j]) {
          explorarIslas(i, j);
          quantityLands++;
        }
      }
    }

    return quantityLands;
  };

  return (
    <><div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input type='number' value={rows} onChange={changeRow} placeholder='Numero Filas'/>
          <input type='number' value={columns} onChange={changeColumn} placeholder='Numero Columnas'/>
        </div>
        <button onClick={createMatrix}>Crear Matriz</button>
      </header>
    </div>
    <div>
      <h3>Mapa Generado:</h3>
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <h3>Cantidad de Islas: {quantityLands}</h3>
    </div>
    </>
  );
}

export default App;
