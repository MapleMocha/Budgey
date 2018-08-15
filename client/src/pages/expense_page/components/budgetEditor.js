import React, { Component } from "react";
import axios from "axios";
import "./budgetEditor.css";

class BudgetEditor extends Component {

  editCategory = event => {
    event.preventDefault();
    const category_id = this.props.category.id
    const newGoal = event.target.maxGoal.value;

      axios.put(`/api/v1/category/${category_id}.json`, { newGoal })
           .then(res => {
              this.props.update();
              this.props.close();
              if (this.props.updateHome) {
                this.props.updateHome();
              }
            });

    };


  render() {
    const { component: Component, ...props } = this.props;
    return (
      <form className="budget-edit-form text-center" onSubmit={this.editCategory} >
        <h4 className="py-4">Edit your category budget:</h4>

        <div className="form-group row px-4">
          <label htmlFor="maxGoal" className="col-sm-3 col-form-label">
            New budget goal:
          </label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="maxGoal" placeholder={this.props.category.goal} />
          </div>
        </div>

        <div className="form-group row px-4">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-outline-primary px-4">
              Update
            </button>
          </div>
        </div>

      </form>
    );
  }
}

export default BudgetEditor;
