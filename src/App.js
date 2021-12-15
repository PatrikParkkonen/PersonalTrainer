import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import { render } from "react-dom";
import { Routes, Route, Link } from "react-router-dom"

function App() {

  return (

    <div className="App">

      <nav>

        <ul>

          

          <li>

            <Link to="Customerlist">Customers</Link>

          </li>

          <li>

            <Link to="Traininglist">Trainings</Link>

          </li>

        </ul>

      </nav>

      <div className="main">

        {/* Define all the routes */}

        <Routes>

          

          <Route path="Customerlist" element={<Customerlist />}></Route>

          <Route path="Traininglist" element={<Traininglist />}></Route>

        </Routes>

      </div>

    </div>

  )

}









export default App
