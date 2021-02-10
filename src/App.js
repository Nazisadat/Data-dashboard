import logo from "./logo.svg";
import "./App.css";
import Main from "./main/main";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Crawler from "./crawler/crawler";
import Home from "./home/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/crawler">
              <Crawler />
            </Route>
          </Switch>
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
