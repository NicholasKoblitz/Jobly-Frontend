import React, {useState} from 'react';
import '../styles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import Companies from './Companies';
import CompanyDetails from './CompanyDetails';
import Jobs from './Jobs';
import JobDetails from './JobDetails';
import TokenContext from './TokenContext';
import UserContext from './UserContext';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Profile from './Profile';

function App() {

  const [token, setToken] = useState('')
  const [user, setUser] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <TokenContext.Provider value={{token, setToken}}>
          <UserContext.Provider value={{user, setUser}}>
            <NavBar/>
          </UserContext.Provider>
        <main>
        <UserContext.Provider value={{user, setUser}}>
          <Routes>
              <Route exact path="/" element={<HomePage/>} />
              <Route  path='/companies' element={<Companies/>} />
              <Route exact path="/companies/:handle" element={<CompanyDetails/>} />
              <Route exact path="/jobs" element={<Jobs/>} />
              <Route exact path="/jobs/:id" element={<JobDetails/>}/>
              <Route exact path="/signup" element={<SignupForm/>} />
              <Route exact path="/login" element={<LoginForm/>} />
              <Route exact path='/users/:username' element={<Profile/>}/>
          </Routes>
          </UserContext.Provider>
        </main>
        </TokenContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
