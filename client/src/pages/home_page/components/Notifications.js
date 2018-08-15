import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

class Notification extends Component {
  componentDidMount() {
    this.createNotification();
  }

  createNotification = () => {
    let overBudget = [];

    this.props.categories.forEach((category) => {
      if (category.board_type === 'expense'){
        if (JSON.parse(category.current_total) > JSON.parse(category.goal)) {
          overBudget.push(category);
        }
      }
    })

    overBudget.forEach((over) => {
      NotificationManager.warning(
        `You have gone over your budgeting goal for ${over.name}`,
        "Warning",
        5000
      );
    })

  };

  render() {
    return <NotificationContainer />;
  }
}

export default Notification;
