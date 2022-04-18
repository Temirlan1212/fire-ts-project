import React, { useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import "./Sort.css";

const Sort = () => {
  const {
    filterCheapPizza,
    filterExpensivePizza,
    fetchData,
    FilterByTimestamp,
  } = useProducts();

  const getValue = (e: any) => {
    let value = e.target.value;

    if (value === "value1") {
      filterCheapPizza();
    } else if (value === "value2") {
      filterExpensivePizza();
    } else if (value === "value3") {
      FilterByTimestamp();
    } else {
      fetchData();
    }
  };

  return (
    <div className="sort-section">
      <div className="sort-section__text">something</div>
      <select
        name="select"
        onChange={getValue}
        className="username"
        style={{
          margin: "0",
          backgroundColor: "black",
        }}
      >
        <option value="value1">Pizza до 1000с</option>
        <option value="value2">Pizza от 1000с</option>
        <option value="value3">Новые</option>
        <option value="all" selected>
          по умолчанию
        </option>
      </select>
    </div>
  );
};

export default Sort;
