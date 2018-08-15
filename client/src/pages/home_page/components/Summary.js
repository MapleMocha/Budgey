import React, { Component } from "react";
import "./Summary.css";
import { Doughnut } from "react-chartjs-2";

class CategoryContainer extends Component {

  render() {
    let dataPoint = [];
    let labels = [];

    this.props.categories.forEach(function(category) {
      if (category.board_type === "expense") {
        dataPoint.push(category.current_total);
        labels.push(category.name);
      }
    });

    dataPoint = dataPoint.reverse();
    labels = labels.reverse();

    if (dataPoint.length != 0){
      const options = {
        responsive: false,
        legend: {
          display: true,
          position: "right"
        },
      };

      const data = {
        labels: labels,
        datasets: [
          {
            backgroundColor: ['#ae0001',' #eeba30','#000000','#f72f53','#000080','#008000','#fef65b','#9EB6B8', '#767BA5', '#2C3571', '#008080', '#FF6347'],
            data: dataPoint
          }
        ]
      };

      return (
        <div className="summary text-center">
          <h4 className="py-3">Expenses</h4>
          <div className="pie-chart">
            <Doughnut data={data} options={options} height={200} />
          </div>
        </div>
      );

    } else {

      return (
        <div className="summary text-center">
          <h4 className="py-3">Expenses</h4>
          <h2> Click Below to start adding expenses! </h2>
        </div>
      )
      
    }

  }
}

export default CategoryContainer;
