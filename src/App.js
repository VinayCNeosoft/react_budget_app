import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Main from './component/Main';

function App() {
  return (
    <>
    <Router>
    <div className="App">

    <Routes>
      <Route path="/" exact element={<Register/>}/>
      <Route path="/log" exact element={<Login/>}/>
      <Route path="/home" exact element={<Main/>}/>
    </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;