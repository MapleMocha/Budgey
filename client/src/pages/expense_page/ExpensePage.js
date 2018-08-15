import React, { Component } from "react";
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import BarGraphs from "../home_page/components/BarGraphs";
import ExpenseTable from "./components/ExpenseTable";
import axios from "axios";
import NewEntryModal from "./components/NewEntryModal";
import BudgetEditor from "./components/budgetEditor";
import Popup from "reactjs-popup";
import { Redirect } from "react-router-dom";
import "./ExpensePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ExpensePage extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      orderBy: 'id desc'
    };
  }

  update(order) {
    const id = this.props.match.params["id"];
    const params = { orderBy: (order || this.state.orderBy)}
    axios.get(`http://localhost:3002/api/v1/category/${id}`, {params})
         .then(response => {
            this.setState({
              category: response.data[0],
              entries: response.data[1]
            });
          })
         .catch(error => console.log(error));
   }

  changeOrder = event => {
    event.preventDefault()
    const newOrder = event.target.id
    this.setState ({
      orderBy: event.target.id
    })
    this.update(newOrder)
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount() {
    this.update(this.state.orderBy);
  }

  popupModal(buttonName, ModalType) {
    return(
      <Popup trigger={
          <button type="button" className="btn btn-outline-primary px-4" >
            {buttonName}
          </button> } modal closeOnDocumentClick >
        {close => (
          <ModalType
            update={this.update.bind(this)}
            category={this.state.category}
            updateHome={this.props.update}
            close={close.bind(this)}
          />
        )}
      </Popup>
    )
  }

  makeDropdownItem(id, name) {
    return (
      <DropdownItem id={id} onClick={this.changeOrder}>
        {name}
      </DropdownItem>
    )
  }

  render() {
    if (!localStorage.getItem("currUser_id")) {
      return <Redirect to="/login" />;
    }
    return (
      <Container>
        {this.state && this.state.entries && (
            <div className="expense-page">
              <a href="/home" className="btn btn-outline-primary px-3 mt-4" id="income-go-home">
                <FontAwesomeIcon icon="home" />
              </a>
              <h1 className="text-center">{this.state.category.name}</h1>
              <h4 className="text-center mb-4" id="expense-budgeted">
                Budgeted - ${this.state.category.goal}
              </h4>

              <BarGraphs card={this.state.category} />

              <div className="mt-4 mb-2" id="expense-buttons">
                {this.popupModal('Add Entry', NewEntryModal)}
                {this.popupModal('Edit Budget Amount', BudgetEditor)}

                <Dropdown isOpen={this.state.dropdownOpen} size="md" toggle={this.toggle}>
                <DropdownToggle caret color="primary" className="dropdown-button">
                    Change View
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>
                      Order By:
                    </DropdownItem>
                    {this.makeDropdownItem('name', 'A - Z')}
                    {this.makeDropdownItem('date desc', 'Date - Newest')}
                    {this.makeDropdownItem('date asc', 'Date - Oldest')}
                    {this.makeDropdownItem('amount desc', '$$$ - $')}
                    {this.makeDropdownItem('amount asc', '$ - $$$')}
                    {this.makeDropdownItem('id desc', 'Last Added')}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <ExpenseTable
                entries={this.state.entries}
                id={this.state.category.id}
                update={this.update.bind(this)}
                updateHome={this.props.update}
              />

            </div>
          )}
      </Container>
    );
  }
}

export default ExpensePage;
