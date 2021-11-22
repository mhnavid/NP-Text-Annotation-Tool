import "./App.css";
import { createBrowserHistory } from "history";
import { Router, Route, Redirect } from "react-router-dom";
import Home from "./views/home";

function App() {
  const hist = createBrowserHistory();
  return (
    <div>
      <Router history={hist}>
        <Route exact path="/" component={Home} />
        <Route component={handleNoMatch} />
      </Router>
    </div>
  );
}

function handleNoMatch() {
  return <Redirect to="/" />;
}

export default App;
