import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Topbar from './components/Topbar';
import Calendar from './components/Calendar';
import EditorText from './components/EditorText';
import Today from './components/Today';
import { useContext } from 'react';
import { varCtx } from './shared/shared';
import { Redirect } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const { value } = useContext(varCtx)
  return (
    <div className="App">
      <Route path="/app" component={Topbar} />
      <Route path="/app/home" component={Home} />
      <Route path="/app" ><Redirect to="/app/home" /></Route>
      <Route exact path="/app/today" component={Today} />
      <Route path="/app/write" component={EditorText} />
      <Route path="/app/calendar" ><Calendar value={value} /></Route>
    </div>




  );
}
export default App;


