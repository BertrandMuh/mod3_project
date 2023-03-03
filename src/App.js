
import './App.css';

import { Routes, Route } from 'react-router-dom'
import Loading from './components/Loading';
import Auth from './pages/Auth'
import Home from './pages/homepage';
import Nav from './components/Nav';
import ActiveTrades from './pages/Active_trades';
import Performance from './pages/Account_summary';
import Instrument from './pages/Instrument';
import { useContext, useRef, useEffect } from 'react';
import { AppContext } from './context/app_context';
import { candlesResquest } from './api_request';

function App() {

  let { setPairList } = useContext(AppContext)
  let isFirstRender = useRef(true)
  useEffect(() => {
    const handleFitstLoad = async () => {
      if (isFirstRender.current) {
        let result = await candlesResquest()
        setPairList(result)
        isFirstRender.current = false
      }
    }
    handleFitstLoad()

  }, [setPairList])


  return (
    <div className="App">
      {/* <Nav /> */}
      <Routes>
        <Route path='/' element={<Auth />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/trading-avenue/trades' element={<ActiveTrades />} />
        <Route path='/trading-avenue/account_summary' element={<Performance />} />
        <Route path='/trading-avenue/instrument' element={<Instrument />} />
        <Route path='/:any' element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;