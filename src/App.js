import { useState } from "react";
import Button from "./Components/Button";
import Input from "./Components/Input";
import LabelIcon from "./Components/LabelIcon";
import Register from "./Pages/Register";

function App() {

    const [ showPassIcon, setShowPassIcon ] = useState( true );
  return (
    <div className="App">
        <Register/>

    </div>
  );
}

export default App;