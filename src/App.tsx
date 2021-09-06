import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnswersListPage } from "./pages/AnswersList";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/answers">
          <AnswersListPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
