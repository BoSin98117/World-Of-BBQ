import './App.css';
import LogReg from './views/LogReg';
import BbqPosts from './components/BbqPosts';
import NewBbq from './components/NewBbq';
import OneBbq from './components/OneBbq';
import EditBbq from './components/EditBbq';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {

  return (

    <BrowserRouter>

      <div className="App">

        <Routes>

          <Route element={<LogReg />} path='/' />
          <Route element={<BbqPosts />} path='/home' />
          <Route element={<NewBbq />} path='/newbbq' />
          <Route element={<OneBbq />} path='/bbq/:id' />
          <Route element={<EditBbq />} path='/editbbq/:id' />
          <Route element={<Profile />} path='user/profile/:username' />

        </Routes>

      </div>
      
    </BrowserRouter>
  );
}

export default App;
