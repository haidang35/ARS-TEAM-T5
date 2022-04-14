import { Public } from "./Modules/Public/Public";
import "bootstrap/dist/css/bootstrap.min.css";
import {Admin} from "./Modules/Admin/Dashboard/Admin";




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
        </Switch>
      </BrowserRouter>
    
    </>
  );
}

export default App;
