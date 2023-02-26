
import './App.css';

import { Routes, Route } from 'react-router-dom'
import Loading from './components/Loading';
import Home from './pages/homepage';
import Nav from './components/Nav';
import ActiveTrades from './pages/Active_trades';
import Performance from './pages/Account_summary';
import Instrument from './pages/Instrument';

function App() {


  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trading-avenue/trades' element={<ActiveTrades />} />
        <Route path='/trading-avenue/account_summary' element={<Performance />} />
        <Route path='/trading-avenue/instrument' element={<Instrument />} />
        <Route path='/:any' element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;