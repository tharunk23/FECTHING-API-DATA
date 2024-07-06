import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'
import Button from './Button'
import Breeds from './Breeds'
import Facts from './Facts'
import Fact from './Fact'


function App() {
  

  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/button" element={<Button />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/fact" element={<Fact />} />
          
        </Routes>
      </div>
    </Router>
    
    </>
  )
}

export default App
