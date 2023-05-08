import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./theme"
import './App.css';
import Login from './screens/Login/Login';
import History from './screens/History/History';
import Details from './screens/Details/Details';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    console.log("ENTRO")
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/history" Component={History} />
          <Route exact path="/details/:id" element={<Details themeToggler={()=>themeToggler()} />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
