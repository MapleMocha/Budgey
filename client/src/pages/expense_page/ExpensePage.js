import React, { Component } from "react";
import { Container } from "reactstrap";
import SpendingSummary from "./components/SpendingSummary";
import ExpenseTable from "./components/ExpenseTable";
import axios from "axios";
import NewEntryModal from "./components/NewEntryModal";
import Popup from "reactjs-popup";
import { Redirect } from 'react-router-dom';

class ExpensePage extends Component {

  update() {
    const id = this.props.match.params['id']
    axios.get(`http://localhost:3002/api/v1/category/${id}.json`)
         .then(response => {
           this.setState({
             category: response.data[0],
             entries: response.data[1]
           });
          })
         .catch(error => console.log(error));

  }

  componentDidMount() {
    this.update()
  }

  render() {

    if (!localStorage.getItem('jwtToken') && !localStorage.getItem('fbUser') && !localStorage.getItem('googleUser')) {
      return <Redirect to='/login' />
    }
    return (
      <Container>
        { this.state && this.state.entries &&
          <div>
            <h1 align='center'>{this.state.category.name}</h1>
            <br/>
            <h5 align='center'>Current Spent: ${this.state.category.current_total}  Budgeted: ${this.state.category.goal}</h5>
            <br/>
            <SpendingSummary category={this.state.category}/>
            <br/>
            <br/>
            <Popup trigger={
              <button type="button" className="btn btn-primary px-4">
              Add Entry
              </button>} modal closeOnDocumentClick>
              <NewEntryModal update={this.update.bind(this)} id={this.state.category.id} updateHome={this.props.update}/>
            </Popup>
            <ExpenseTable entries={this.state.entries} id={this.state.category.id} update={this.update.bind(this)} updateHome={this.props.update}/>
          </div>
        }
      </Container>
    );
  }
}

export default ExpensePage;
