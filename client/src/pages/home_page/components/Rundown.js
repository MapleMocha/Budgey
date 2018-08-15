import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./Rundown.css";
import NumberFormat from "react-number-format";


const renderContent = (income, expenses) => {

  const amount_left = (income - expenses).toFixed(2);

  let color = "rgb(139, 179, 88)";
  if (amount_left < 0) {
    color = "red";
  }

  return(
    <div>

      <div className="rundown-income d-flex bd-highlight mx-5">
        <div className="mr-auto bd-highlight">
          <h6>Income</h6>
        </div>
        <div className="ml-auto bd-highlight" id="total-income">
          <NumberFormat value={`${income.toFixed(2)}`} displayType={"text"} thousandSeparator={true} prefix={"$"} />
        </div>
      </div>

      <div className="rundown-spending d-flex bd-highlight mx-5">
        <div className="mr-auto bd-highlight">
          <h6>Spending</h6>
        </div>
        <div className="ml-auto bd-highlight" id="total-expenses">
          <NumberFormat value={`${expenses.toFixed(2)}`} displayType={"text"} thousandSeparator={true} prefix={"-$"} />
        </div>
      </div>

      <hr width="80%" />

      <div className="rundown-leftover d-flex bd-highlight mx-5">
        <div className="mr-auto bd-highlight">
          <h6>Leftover</h6>
        </div>
        <div className="ml-auto bd-highlight">
          <p id="amount-left" style={{ color: color }}>
            <NumberFormat value={`${amount_left}`} displayType={"text"} thousandSeparator={true} prefix={"$"} />
          </p>
        </div>
      </div>

    </div>
  )
}


class Rundown extends Component {
  render() {
    let total_income = 0.0;
    let total_expenses = 0.0;
    let projected_expenses = 0.0;

    this.props.categories.forEach(function(category) {
      if (category.board_type === "income") {
        total_income += parseFloat(category.current_total);
      } else {
        total_expenses += parseFloat(category.current_total);
        projected_expenses += parseFloat(category.goal);
      }
    });

    return (
      <div className="rundown mt-3">
        <h4 className="text-center">You&apos;ve budgeted...</h4>
        <Tabs>
          <TabList>
            <Tab>Current</Tab>
            <Tab>Projected</Tab>
          </TabList>
          <TabPanel>
            {renderContent(total_income, total_expenses)}
          </TabPanel>

          <TabPanel>
            {renderContent(total_income, projected_expenses)}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Rundown;
