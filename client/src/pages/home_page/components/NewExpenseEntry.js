import React, { Component } from "react";
import "./NewExpenseEntry.css";
import axios from "axios";
import { Redirect } from 'react-router-dom';

class NewExpenseEntry extends Component {


  submitNewCategory = event => {
    event.preventDefault();
      const entry = {
        name: event.target.Name.value,
        amount: event.target.amount.value,
        description: event.target.Description.value,
        date: event.target.Date.value,
        category_id: this.props.category.id,
    };

    axios.post(`http://localhost:3002/api/v1/entry.json`, { entry })
         .then(res => {
            this.props.update()
         })
  }


  render() {
    const { component: Component, ...props } = this.props

    return (
      <form onSubmit={ this.submitNewCategory }>
        <h4 className="py-4">Add New Expense Entry:</h4>

        <div className="form-group row px-4">
          <label htmlFor="categoryName" className="col-sm-3 col-form-label">
            Title:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="Name"
              placeholder="i.e. SuitCase"
            />
          </div>
        </div>

        <div className="form-group row px-4">
          <label htmlFor="maxGoal" className="col-sm-3 col-form-label">
            Amount:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="i.e. $75.00"
            />
          </div>
        </div>

        <div className="form-group row px-4">
          <label htmlFor="maxGoal" className="col-sm-3 col-form-label">
            Description:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="Description"
              placeholder="New suitcase for vacation"
            />
          </div>
        </div>

        <div className="form-group row px-4">
          <label htmlFor="maxGoal" className="col-sm-3 col-form-label">
            Date:
          </label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="Date" placeholder="09-12-2018" />
          </div>
        </div>

        <div className="form-group row px-4">
          <div className="col-sm-12">
            <button category={props.category} update={props.update}  type="submit" className="btn btn-outline-primary px-4">
              Add
            </button>
          </div>
        </div>

      </form>
    )
  }
}

export default NewExpenseEntry;
