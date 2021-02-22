import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './comp/Landing';
import SignUp from './comp/SignUp';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;