import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Public } from "./Modules/Public/Public";
import "bootstrap/dist/css/bootstrap.min.css";
import { Admin } from "./Modules/Admin/Admin";
import Login from "./Modules/Admin/Auth/Components/Login/Login";
import Register from "./Modules/Admin/Auth/Components/Register/Register";

const isLogged =
  localStorage.getItem("access_token") !== "" &&
  localStorage.getItem("access_token") !== null;

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/admin">
            {isLogged ? <Admin /> : <Redirect to="/admin-login" />}
          </Route>
          <Route path="/" exact>
            <Public />
          </Route>
          <Route path="/admin-login" exact>
            <Login />
          </Route>
          <Route path="/admin-register" exact>
            <Register />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
