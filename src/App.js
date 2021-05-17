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
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PriveteRoute/PrivateRoute';
import Shipment from './Components/Shipment/Shipment';
import ThankYouPage from './Components/ThankYouPage/ThankYouPage';

export const userContext = createContext();
export const minCarBtnContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [minCartBtnCount, setMinCartBtnCount] = useState([])

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <minCarBtnContext.Provider value={[minCartBtnCount, setMinCartBtnCount]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/orders">
              <Orders></Orders>
            </Route>
            <PrivateRoute exact path="/admin">
              <Admin></Admin>
            </PrivateRoute>
            <PrivateRoute exact path="/editProduct">
              <EditProduct></EditProduct>
            </PrivateRoute>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute exact path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <PrivateRoute exact path="/thankyoupage">
              <ThankYouPage></ThankYouPage>
            </PrivateRoute>
            <Route path="*">
              <NotFoundPage></NotFoundPage>
            </Route>
          </Switch>
        </Router>
        </minCarBtnContext.Provider>
    </userContext.Provider>
  );
}

export default App;
