import React, { Component } from "react";
import "./App.css";
import Navbar from "./global_components/Navbar";
import LandingPage from "./pages/landing_page/LandingPage";
import SignupPage from "./pages/signup_page/SignupPage";
import LoginPage from "./pages/login_page/LoginPage";
import HomePage from "./pages/home_page/HomePage";
import ExpensePage from "./pages/expense_page/ExpensePage";
import IncomePage from "./pages/income_page/IncomePage";
import Footer from "./global_components/Footer";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faCar,
  faUtensils,
  faTruck,
  faGamepad,
  faMoon,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(
  faHome,
  faCar,
  faUtensils,
  faTruck,
  faGamepad,
  faMoon,
  faTrash,
  fab
);

class App extends Component {
  update() {
    const currUser = localStorage.getItem("currUser_id");
    axios
      .get("/api/v1/category", {
        params: { user_id: currUser }
      })
      .then(response => {
        this.setState({
          categories: response.data
        });
      })
      .catch(error => console.log(error));
  }

  clearState() {
    this.setState({
      categories: []
    });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.update();
  }

  render() {
    return (
      <BrowserRouter>
        {this.state &&
          this.state.categories && (
            <div>
              <Navbar clearState={this.clearState.bind(this)} />
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/home" render={props => (
                    <HomePage
                      categories={this.state.categories}
                      update={this.update.bind(this)}
                      {...props}
                    />
                  )}
                />
                <Route path="/expense/:id" render={props => (
                    <ExpensePage
                      categories={this.state.categories}
                      update={this.update.bind(this)}
                      {...props}
                    />
                  )}
                />
                <Route path="/income/:id" render={props => (
                    <IncomePage
                      categories={this.state.categories}
                      update={this.update.bind(this)}
                      {...props}
                    />
                  )}
                />
              </Switch>
            </div>
          )}
      </BrowserRouter>
    );
  }
}

export default App;
