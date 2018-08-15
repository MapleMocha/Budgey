import React, { Component } from "react";
import "./NewExpenseModal.css";
import axios from "axios";

class NewExpenseModal extends Component {


  submitNewCategory = event => {
      event.preventDefault();

      let icon_name = ''
      const type = event.target.iconList.value

      switch (type) {
        case "Food":
          icon_name = 'utensils'
          break;
        case "Transportation":
          icon_name = 'train'
          break;
        case "Home Expenses":
          icon_name = 'home'
          break;
        case "Entertainment":
          icon_name = 'film'
          break;
        case "Shopping":
          icon_name = 'shopping-bag'
          break;
        case "Alcohol":
          icon_name = 'wine-glass'
          break;
        case "Vacation":
          icon_name = 'map'
          break;
        case "Other":
          icon_name = 'asterisk'
          break;
        default:
          icon_name = 'asterisk'
          break;
      }

        const category = {
          name: event.target.categoryName.value,
          board_type: 'expense',
          icon: icon_name,
          goal: event.target.maxGoal.value,
          current_total: 0,
          user_id: localStorage.getItem('currUser_id'),
      };


      axios.post(`/api/v1/category.json`, { category })
           .then(res => {
             this.props.update()
             this.props.close()
           })
    }


  render() {
    const { component: Component, ...props } = this.props

    return (
      <form onSubmit={this.submitNewCategory}>
        <h4 className="py-4">Add New Expense Category:</h4>

        <div className="form-group row px-4">
          <label htmlFor="categoryName" className="col-sm-3 col-form-label">
            Title:
          </label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="categoryName" placeholder="i.e. Vacation"/>
          </div>
        </div>

        <div className="form-group row px-4">
          <label htmlFor="category-icon" className="col-sm-3 col-form-label">
            Select Type:
          </label>
          <div className="col-sm-9">
            <select className="form-control" id="iconList">
              <option> Food </option>
              <option> Transportation </option>
              <option> Home Expenses </option>
              <option> Entertainment </option>
              <option> Shopping </option>
              <option> Alcohol </option>
              <option> Vacation </option>
              <option> Other </option>
            </select>
          </div>
        </div>

        <div className="form-group row px-4">
          <label htmlFor="maxGoal" className="col-sm-3 col-form-label">
            Maximum Goal Spending Amount:
          </label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="maxGoal" placeholder="i.e. $75.00" />
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

export default NewExpenseModal;
