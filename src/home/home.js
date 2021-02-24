import React from "react";
import { Container, Paper } from "@material-ui/core";
import "./home.css";

export default function Home() {
  return (
    <Container>
      <div className="home">
        <div className="bkground">
          <div className="entry-content">
            <h1> Data Admin Dashboard </h1>
            <p>
              This dashboard is developed by <b>DiGiCor Data Science Group</b>{" "}
              to Analyse the data and provide the insight to the managers. This
              Group used <em>Flask, React Hooks, JavaScript and Material Ui</em>{" "}
              to create and develope this dashboard.
            </p>
            <p>
              A key role of the management accountant is to support effective
              decision making by presenting relevant, timely and accurate
              information in a manner that enables informed dialogue and
              decision making.
            </p>
            <p>
              The role of visualisation in this process is to present the
              relevant data in such a way that the message is quickly absorbed
              and understood by the reader so that action can be taken quickly,
              and time is spent on decision making rather than understanding
              performance.
            </p>
          </div>
          <div className="date">
            <em> Decembre 2020 - March 2021 </em>
          </div>
          <div className="location">Melbourne, Australia</div>
        </div>
      </div>
    </Container>
  );
}
