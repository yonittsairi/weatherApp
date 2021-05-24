import logo from './logo.svg';
import './App.css';
import { TaskApp } from './cmps/TaskApp.jsx';
import NavBar from './cmps/NavBar';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { FavoriteList } from './pages/FavoriteList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>

        <Route component={FavoriteList} path="/favorite" />
        <Route component={TaskApp} path="/" />
      </Switch>

    </div>
  );
}

export default App;
