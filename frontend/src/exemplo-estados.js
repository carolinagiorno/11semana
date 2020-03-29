import React, { useState } from 'react';
import Header from './Header';
import Logon from '/pages/Logon';

//component -> function that returns html
//jsx -> javascript + xml
function  App() {
    //array [valor, funcaoDeAtualizaçãoDoValor]
    let [counter, setCounter] = useState(0);

    function increment() {
      setCounter(counter + 1);
      console.log(counter);
    }

    return (
      <>
        <Header>Contador: {counter}</Header>
        <button onClick={increment}>Incrementar</button>
      </>
    );
}

export default App;
