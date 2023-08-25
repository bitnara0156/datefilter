import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './styles.css'
import MyGrid from './Components/MyGrid';
import DataContext from './DataContext.js';

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [orFilteredRowData, setOrFilteredRowData] = useState([]);
  const listItems = rowData.map((rowData) =>
  <div style={{color: "white", float: "left",  background: "#1c4587",width:"225px", fontSize:"18px"
}}>{rowData.New}</div>);
  useEffect(() => {
    fetch('https://sheet.best/api/sheets/83ac0bfd-7c8c-45df-97c5-f3e3a65c99e2')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((row, ind) => row.id = ind);
        setRowData(data);
        let dataCopy = data.map(row => ({ ...row }));
        setOrFilteredRowData(dataCopy);
      })
      .catch(err => console.log(err));

  }, []);

const listItems2 = rowData.map((rowData) =>
<div style={{color: "white", float: "left",  background: "#0b5394",width:"135px", fontSize:"14px"
}}>{rowData.Total}</div>
);

  return (
    <DataContext.Provider value={{ rowData, orFilteredRowData, setOrFilteredRowData }}>







      <MyGrid />

      <div style={{color: "red",position: "absolute",top: "0" }}>{listItems}</div>
<div style={{color: "red",position: "absolute",top: "20px" }}>{listItems2}</div>
    </DataContext.Provider>
  )
}

render(<App />, document.querySelector('#root'));
