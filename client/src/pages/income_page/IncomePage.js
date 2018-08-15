import React, { Component } from "react";
import {
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import IncomeTable from "./components/IncomeTable";
import NewIncomeEntry from "./components/NewIncomeEntry";
import axios from "axios";
import Popup from "reactjs-popup";
import { Redirect } from "react-router-dom";
import "./IncomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class IncomePage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      orderBy: "id desc"
    };
  }

  update(order) {
    const { id } = this.props.match.params;
    const params = { orderBy: order || this.state.orderBy };
    axios.get(`/api/v1/category/${id}`, { params })
         .then(response => {
           this.setState({
             category: response.data[0],
             entries: response.data[1]
           });
         })
         .catch(error => console.log(error));
  }

  changeOrder = event => {
    event.preventDefault();
    const newOrder = event.target.id;
    this.setState({
      orderBy: event.target.id
    });
    this.update(newOrder);
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount() {
    this.update(this.state.orderBy);
  }

  render() {
    if (!localStorage.getItem("currUser_id")) {
      return <Redirect to="/login" />;
    }

    return (
      <Container>
        {this.state && this.state.entries && (
            <div className="income-page">
              <a href="/home" className="btn btn-outline-primary px-3 mt-4" id="income-go-home">
                <FontAwesomeIcon icon="home" />
              </a>
              <h1 className="text-center">{this.state.category.name}</h1>
              <h4 className="text-center mb-4 income-total">
                Total - ${this.state.category.current_total}
              </h4>
              <div id="income-buttons">
                <Popup
                  trigger={
                    <button type="button" className="btn btn-outline-primary px-4" id="add-income-entry">
                      Add Entry
                    </button>
                  } modal closeOnDocumentClick >

                    {close => (
                      <NewIncomeEntry
                        update={this.update.bind(this)}
                        updateHome={this.props.update}
                        state_category={this.state.category}
                        state_entry={this.state.entry}
                        close={close.bind(this)} />
                    )}
                </Popup>

                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret color="primary" className="dropdown-button" >
                    Change View
                  </DropdownToggle>

                  <DropdownMenu>
                    <DropdownItem header>Order By:</DropdownItem>

                    <DropdownItem id="name" onClick={this.changeOrder}>
                      A - Z
                    </DropdownItem>

                    <DropdownItem id="date desc" onClick={this.changeOrder}>
                      Date - Newest
                    </DropdownItem>

                    <DropdownItem id="date asc" onClick={this.changeOrder}>
                      Date - Oldest
                    </DropdownItem>

                    <DropdownItem id="amount desc" onClick={this.changeOrder}>
                      $$$ - $
                    </DropdownItem>

                    <DropdownItem id="amount asc" onClick={this.changeOrder}>
                      $ - $$$
                    </DropdownItem>

                    <DropdownItem id="id desc" onClick={this.changeOrder}>
                      Last Added
                    </DropdownItem>

                  </DropdownMenu>
                </Dropdown>
              </div>
              <IncomeTable
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

export default IncomePage;
