import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from '../src/container/home/Home';
import Login from '../src/component/auth/Login';

function App() {
  return (
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;