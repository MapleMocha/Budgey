import React, { Component } from "react";
import "./BarGraphs.css";
import { Progress } from "reactstrap";

class BarGraphs extends Component {
  render() {
    
    const card = this.props.card;
    const percentage = (card.current_total / card.goal) * 100;

    let barColor = "success";
    if (percentage > 100) {
      barColor = "danger";
    }

    return (
      <div>
        <Progress color={barColor} value={percentage}>
          $ {card.current_total}
        </Progress>
      </div>
    );
  }
}

export default BarGraphs;
