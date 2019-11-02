import React from 'react';
import './App.css';
import SnakeGame from './components/snakeGame';
import store from './redux/reduxStore';
import { compose } from 'redux';
import { Provider } from 'react-redux'
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HighScore from './components/highScore';



function AppC() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => <SnakeGame />} />
        <Route path='/highscore' render={() => <HighScore />} />
        <Route path='*' render={() => <div>404 NOT FOUND</div>} />
      </Switch>

    </div>
  );
}


const App = (props) => {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppC />
      </Provider>
    </BrowserRouter>
  )
}


export default App;
