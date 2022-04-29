import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Public } from "./Modules/Public/Public";
import "bootstrap/dist/css/bootstrap.min.css";
import { Admin } from "./Modules/Admin/Admin";
import Login from "./Modules/Admin/Auth/Components/Login/Login";
import Register from "./Modules/Admin/Auth/Components/Register/Register";
import { useEffect, useState } from "react";
import publicService from "./Modules/Public/Shared/Services/PublicService";



const isLogged =
  localStorage.getItem("access_token") !== "" &&
  localStorage.getItem("access_token") !== null;



function App() {
  const [authUser, setAuthUser] = useState('');

  useEffect(() => {
    getAuthUser();
  }, [])

  const getAuthUser = async () => {
    const authToken = localStorage.getItem('access_token');
    if (authToken !== '' && authToken !== null) {
      await publicService.getAuthUser(authToken)
        .then((res) => {
          localStorage.setItem("auth_user", JSON.stringify(res.data))
          // setAuthUser(res.data);
        })

    }
  }


  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" exact>
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
