import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App.jsx";
import rootReducer from './reducer';
import { Route, withRouter, Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import history from "./History.js";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        );
    }
}
const RootWithRouter = withRouter(Root);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <RootWithRouter />
        </Router>
    </Provider>
), document.getElementById("root"));