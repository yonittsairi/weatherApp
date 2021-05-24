import logo from './logo.svg';
import './App.css';
import { WeatherApp } from './cmps/WeatherApp.jsx';
import NavBar from './cmps/NavBar';
import { Switch, Route } from 'react-router-dom'
import { FavoriteList } from './pages/FavoriteList';

function App() {

  return (
    <div className="App">
      <NavBar />
      <Switch>

        <Route component={FavoriteList} path="/favorite" />
        <Route component={WeatherApp} path="/" />
      </Switch>

    </div>
  );
}

export default App;
