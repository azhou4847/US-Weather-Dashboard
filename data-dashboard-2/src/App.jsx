import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import DetailView from './routes/DetailView';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index={true} path="/" element={<Dashboard/>}/> 
            <Route index={false} path="/:date/:location" element={<DetailView/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
