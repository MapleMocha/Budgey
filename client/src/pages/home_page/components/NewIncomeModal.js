import React, { Component } from "react";
import "./NewIncomeModal.css";
import axios from "axios";

class NewIncomeModal extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const category = {
      name: event.target.categoryName.value,
      board_type: "income",
      goal: 0,
      current_total: 0,
      user_id: localStorage.getItem('currUser_id'),
    };

    axios.post(`/api/v1/category.json`, { category })
         .then(res => {
           this.props.update();
           this.props.close();
         });
  };

  render() {
    const { component: Component, ...props } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4 className="py-4">Add new Income category:</h4>

        <div className="form-group row px-4">
          <label htmlFor="categoryName" className="col-sm-3 col-form-label">
            Income Source Name:
          </label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="categoryName" placeholder="Income Source" />
          </div>
        </div>

        <div className="form-group row px-4">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-outline-primary px-4">
              Add
            </button>
          </div>
        </div>

      </form>
    );
  }
}

export default NewIncomeModal;
