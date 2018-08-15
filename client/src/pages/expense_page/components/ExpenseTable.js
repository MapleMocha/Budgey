import React, { Component } from "react";
import axios from "axios";
import "./ExpenseTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

class ExpenseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false
    };
  }

deleteEntryButton(entry) {
const deleteEntryMessage = "Are you sure you want to delete this expense entry?\nYou will not be able to undo this action.";

    return (
      <button type="button" className="btn btn-danger delete-btn entryDelete"
        onClick={e => {
          if (window.confirm(deleteEntryMessage)) {
            this.deleteEntry(entry);
          }
        }} >
        <FontAwesomeIcon icon="trash" />
      </button>
    )
  }

  makeEntryRow = entries => {
    let count = 0;
    const allRows = entries.map(entry => {
      count += 1;
      return (
        <tr className="entryRow">
          <th scope="row">{count}</th>
          <td>{entry.name}</td>
          <td>{entry.date}</td>
          <td>$ {entry.amount}</td>
          <td>{entry.description}</td>
          <td className="text-right">
            {this.deleteEntryButton(entry.id)}
          </td>
        </tr>
      );
    });
    return allRows;
  };

  deleteCategory = event => {
    event.preventDefault();

    const category_id = this.props.id;

    axios.delete(`/api/v1/category/${category_id}`).then(res => {
      this.props.updateHome();
      this.setState({
        deleted: true
      });
    });
  };

  deleteEntry = entry_id => {
    axios.delete(`/api/v1/entry/${entry_id}`).then(res => {
      this.props.update();
      this.props.updateHome();
    });
  };

  render() {
    const { component: Component, ...props } = this.props;

    if (this.state.deleted) {
      return <Redirect to="/home" />;
    }
    
    const deleteCategoryMessage = "Are you sure you want to delete this entire category?\nThis will result in the loss of all your expense entry data.\nYou will not be able to undo this action.";


    return (
      <div>
        <div className="expense-table mx-auto py-4 col-md-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
                <th />
              </tr>
            </thead>
            <tbody>{this.makeEntryRow(props.entries)}</tbody>
          </table>

          <button type="button" className="btn btn-outline-danger delete-btn"
            onClick={e => {
              if (window.confirm(deleteCategoryMessage)) {
                this.deleteCategory(e);
              }
            }} >
            Delete Category
          </button>
        </div>
      </div>
    );
  }
}

export default ExpenseTable;
