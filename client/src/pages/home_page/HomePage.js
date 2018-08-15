import React, { Component } from "react";
import "./HomePage.css";
import { Container, Row } from "reactstrap";
import ExpenseBoard from "./components/ExpenseBoard";
import Summary from "./components/Summary";
import IncomeBoard from "./components/IncomeBoard";
import Rundown from "./components/Rundown";
import Notifications from './components/Notifications'
import Footer from "../../global_components/Footer";
import { Redirect } from 'react-router-dom';

class HomePage extends Component {


  componentDidMount() {
    console.log("Welcome!");
    this.props.update();
  }

  render() {
    const { component: Component, ...props } = this.props;

    if (!localStorage.getItem("currUser_id")) {
      return <Redirect to="/login" />;
    }
    
    return (
      <Container className="mt-3">

        <Row>
          <div className="col-md-3" id="left-div">
            <IncomeBoard categories={props.categories} update={props.update} {...props} />
            <Rundown categories={props.categories} update={props.update} {...props} />
          </div>

          <div className="col-md-9" id="right-div">
            <Notifications categories={props.categories} />
            <div>
              <Summary categories={props.categories} update={props.update} />
            </div>
            <div>
              <ExpenseBoard categories={props.categories} update={props.update} {...props} />
            </div>
          </div>

        </Row>
        <Footer />

      </Container>
    );
  }
}

export default HomePage;
