import React, { Component } from "react";
import "./IncomeBoard.css";
import NewIncomeModal from "./NewIncomeModal";
import Popup from "reactjs-popup";
import { NavLink } from "react-router-dom";

const makeCardStack = cards => {
  const allCards = cards.map(card => {
    switch (card['board_type']){
      case 'income':
        return (
          <NavLink to={`/income/${card['id']}`}>
            <div key={card.id} className="card my-2 mx-auto">
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <h6 className="card-subtitle my-2 text-muted">
                  Current Total - {card.current_total}$
                </h6>
              </div>
            </div>
          </NavLink>
        )
    }

  })
  return allCards;
}

class IncomeBoard extends Component {

  render() {
    
    const { component: Component, ...props } = this.props;

    return (
      <div className="income-board py-4 text-center">
        <h4>Income</h4>
        <div className="pt-2" id="income-card-container">
          {makeCardStack(props.categories)}
        </div>
        <Popup trigger={
          <button type="button" className="btn btn-outline-primary income-btn">
            Add Income Source
          </button>} modal closeOnDocumentClick >
          {close => (
            <NewIncomeModal update={props.update} close={close.bind(this)} />
          )}
        </Popup>
      </div>
    );
  }
}

export default IncomeBoard;
