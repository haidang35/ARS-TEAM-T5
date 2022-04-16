import { BrowserRouter, Switch, Route, } from "react-router-dom";
import { Public } from "./Modules/Public/Public";
import "bootstrap/dist/css/bootstrap.min.css";
import {Admin} from "./Modules/Admin/Admin";
import Login from "./Modules/Admin/Auth/Components/Login/Login";
 



function App() {
  return (
    <>
  <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/">
            <Public />
          </Route>
          <Route path="/admin-login" exact>
            <Login />

          </Route>
        </Switch>
      </BrowserRouter>
    
    </>
  );
}

export default App;
