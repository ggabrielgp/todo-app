import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from "./pages/Home";
import Tarea from './pages/Tarea';
import { TaskContextProvider } from './context/TaskContext';
import { useState } from 'react';

const App = () => {
  const [currentTask, setCurrent] = useState(null);

  return (
    <div>
      <nav className="navbar header">
        <span>Logo</span>
      </nav>

      <div className='container'>
        <div className='center'>
          <BrowserRouter>
            <TaskContextProvider>
              <Routes>
                <Route exact path="/" element={<Home setCurrent={setCurrent} currentTask={currentTask} />}></Route>
                <Route exact path="/tarea" element={<Tarea task={currentTask} />}></Route>
              </Routes>
            </TaskContextProvider>
          </BrowserRouter>
        </div>
      </div>

    </div>
  )
}

export default App
