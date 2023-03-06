
import './App.css';

import { Routes, Route } from 'react-router-dom'
import Loading from './components/Loading';
import Home from './pages/homepage';
import Nav from './components/Nav';
import ActiveTrades from './pages/Trades';
import Performance from './pages/Account_summary';
import Instrument from './pages/Instrument';
import { useContext, useRef, useEffect } from 'react';
import { AppContext } from './context/app_context';
import { candlesResquest } from './api_request';
import Auth from './pages/Auth';
import { getUserFromSession } from './components/serverCall';

function App() {
  let { user, setUser, setPairList } = useContext(AppContext)

  let isFirstRender = useRef(true)
  useEffect(() => {
    const handleFitstLoad = async () => {
      if (isFirstRender.current) {
        let result = await candlesResquest()
        let user = await getUserFromSession()
        setUser(user)
        setPairList(result)
        // if (user) {
        //   navigate('/trading-avenue.com')
        // }
        isFirstRender.current = false
      }
    }
    handleFitstLoad()

  }, [setPairList, setUser])


  return (
    <>
      {user ?
        <div className="App">
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/trading-avenue.com' element={<Home />} />
            <Route path='/trading-avenue.com/trades' element={<ActiveTrades />} />
            <Route path='/trading-avenue.com/account_summary' element={<Performance />} />
            <Route path='/trading-avenue.com/instrument' element={<Instrument />} />
            <Route path='/*' element={<Home />} />
          </Routes>
        </div>
        :
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/trading-avenue.com/auth' element={<Auth />} />
          <Route path='/*' element={<Auth />} />
        </Routes>

      }
    </>
  );
}

export default App;