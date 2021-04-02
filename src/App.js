import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import NotFoundPage from './Components/NotFoundPage';
import Orders from './Components/Orders/Orders';
import Admin from './Components/Admin/Admin';
import Login from './Components/Login/Login';
import EditProduct from './Components/Admin/EditProduct';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/orders">
          <Orders></Orders>
        </Route>
        <Route path="/admin">
          <Admin></Admin>
        </Route>
        <Route path="/editProduct">
          <EditProduct></EditProduct>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="*">
          <NotFoundPage></NotFoundPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
