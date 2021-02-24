import React, { useState, useEffect } from "react";
import CrawlerService from "../api/crawler";
import Button from "@material-ui/core/Button";
import PaginationTableComponent from "../components/table";
import BarChart from "../components/charts/barChart.js";
import DoughnutChart from "../components/charts/doughnutChart.js";
import { Grid } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PublishIcon from "@material-ui/icons/Publish";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./crawler.css";
import { AiOutlineBarChart } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    boxSizing: "border-box",
  },
  input: {
    display: "none",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Crawler() {
  const [response, setResponse] = useState();
  const [selectedCol, setSelectedCol] = useState();
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [],
    data: [],
  });
  const [barChartData, setBarChartData] = useState({ labels: [], data: [] });
  const classes = useStyles();

  useEffect(() => {
    if (response && !selectedCol) {
      setChartData("chipset");
    } else if (!response) {
      setSelectedCol("");
      setDoughnutChartData({ labels: [], data: [] });
      setBarChartData({ labels: [], data: [] });
    }
  }, [response]);

  useEffect(() => {
    startCrawler();
  }, []);

  const setChartData = (name) => {
    const doughnutDataData = response.reduce(
      (prev, cur) => ({
        ...prev,
        [cur[name]]: prev[cur[name]] ? prev[cur[name]] + 1 : 1,
      }),
      {}
    );
    // const sortedDoughnutDataKey = Object.entries(doughnutDataData).sort(
    //   (a, b) => b[1] - a[1] // index 1 of entry of objects will show the value of an item in the object
    // ).map(item => item[0]);
    const sortedDoughnutDataKey = Object.keys(doughnutDataData).sort(
      (a, b) => doughnutDataData[b] - doughnutDataData[a]
    );
    const otherData = sortedDoughnutDataKey
      .splice(8)
      .reduce((prev, key) => prev + doughnutDataData[key], 0);
    const doughnutData = sortedDoughnutDataKey.reduce(
      (prev, key) => {
        prev.labels.push(key.length > 32 ? key.substr(0, 30) + "..." : key);
        prev.data.push(doughnutDataData[key]);
        return prev;
      },
      { labels: [], data: [] }
    );
    if (otherData) {
      doughnutData.labels.push("Others...");
      doughnutData.data.push(otherData);
    }
    const barDataData = [0, 0]; // [selected column count, other column count]
    response.forEach((row) =>
      Object.keys(row).forEach((cell) => {
        if (!row[cell]) {
          //if value is null
          barDataData[cell === name ? 0 : 1]++;
        }
      })
    );
    const barData = {
      labels: [`${name} (${barDataData[0]})`, `Others (${barDataData[1]})`],
      data: barDataData,
    };
    setDoughnutChartData(doughnutData);
    setBarChartData(barData);
    setSelectedCol(name);
  };

  const uploadFile = async (e) => {
    const inputElement = e.currentTarget;
    const file = inputElement.files[0];
    if (file) {
      try {
        const res = await CrawlerService.uploadFile(file);
        console.log(res);
        await startCrawler();
        inputElement.value = "";
      } catch (error) {
        console.log("Network Error", error, error.toJson?.(), error.response);
      }
    }
  };

  const startCrawler = async () => {
    try {
      const res = await CrawlerService.startCrawler();

      setResponse(res.data);
    } catch (error) {
      console.log("Network Error", error, error.toJson?.(), error.response);
    }
  };

  return (
    <div>
      <div>
        {!response && (
          <LinearProgress color="secondary" style={{ margin: "10px" }} />
        )}
        {response && (
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={5} xl={5}>
                <Paper className={classes.paper} className="chart1">
                  <DoughnutChart
                    dataCharts={doughnutChartData}
                    label={selectedCol}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} lg={5} xl={5}>
                <Paper className={classes.paper} className="chart1">
                  <BarChart dataCharts={barChartData} label={selectedCol} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} lg={2} xl={2}>
                <Paper className={classes.paper} style={{ height: "100%" }}>
                  <div className="stati bg-sun_flower left">
                    <i className="icon-mustache icons">
                      <AiOutlineBarChart />
                    </i>
                    <div>
                      <b>3105</b>
                      <span>Total null values</span>
                    </div>
                  </div>

                  <div style={{ marginTop: "70px" }}>
                    <input
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      onChange={uploadFile}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                      >
                        Upload
                        <PublishIcon />
                      </Button>
                    </label>
                    <Button
                      variant="contained"
                      color="primary"
                      href={CrawlerService.downloadSpecification}
                    >
                      Download <GetAppIcon />
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              lg={12}
              xl={12}
              style={{ display: "block", width: "100%", overflow: "auto" }}
            >
              <PaginationTableComponent
                data={response || {}}
                onColumnClick={setChartData}
              />
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}

export default Crawler;
