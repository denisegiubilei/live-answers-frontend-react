import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SocketContextProvider } from "./context/SocketContext";

import { AnswersListPage } from "./pages/AnswersList";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <SocketContextProvider>
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
    </SocketContextProvider>
  );
}

export default App;
