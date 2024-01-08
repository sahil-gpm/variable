import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Roomform from './components/Roomform/Roomform';
import { Toaster } from 'react-hot-toast';
import Profile from './components/Authentication/Profile';
import Roominfo from './components/Room/Roominfo';
import Codingarea from './components/Room/Codingarea';
import { useContext, useEffect } from 'react';
import { funcContext } from './contexts/context';
import Notsupported from './components/Notsupported';

function App() {

  const { initSocket } = useContext(funcContext)
  //animation hooks

  useEffect(() => {
    const initSocketConnection = async () => {
      await initSocket()
    }
    initSocketConnection()
  }, [initSocket])
  
  return (
    <>
    <div className='lg:hidden'>
      <Notsupported/>
    </div>
    <div className='hidden lg:block'>
      {/* setting up browserRouter   */}
      <BrowserRouter>

        {/* react hot toast  */}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />

        {/* all routes  */}
        <Routes>

          {/* Home route  */}
          <Route path='/' Component={Home} />

          {/* create account or the sign up - route  */}
          <Route path='auth/create-account' Component={Signup} />

          {/* login to account - route  */}
          <Route path='auth/log-into-account' Component={Login} />

          {/* profile user - route */}
          <Route path='auth/user-profile' Component={Profile} />

          {/* form for room joining - route */}
          <Route path='room/enter-room' Component={Roomform} />

          {/* splash page before code area  */}
          <Route path='room/code-room-preview/:roomCode' Component={Roominfo} />

          {/* actual code space */}
          <Route path='room/coding-area/:roomCode' Component={Codingarea} />

        </Routes>

      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
