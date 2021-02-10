import React, { useState, useEffect } from "react";
//import axios from 'axios';
import CrawlerService from "../api/crawler";
import Button from "@material-ui/core/Button";
import PaginationTableComponent from "../components/table";
import BarChart from "../components/charts/barChart.js";
import LineChart from "../components/charts/lineChart.js";
import DoughnutChart from "../components/charts/doughnutChart.js";
import { Grid } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
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
  //     const [data, setData] = useState({ hits: [] });
  const [response, setResponse] = useState();
  const [selectedCol, setSelectedCol] = useState();
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [],
    data: [],
  });
  const [barChartData, setBarChartData] = useState({ labels: [], data: [] });
  const classes = useStyles();

  const setChartData = (name) => {
    const doughnutDataData = response.reduce((prev, cur) => {
      if (!prev[cur[name]]) {
        prev[cur[name]] = 0;
      }
      prev[cur[name]]++;
      return prev;
    }, {});
    const sortedDoughnutDataKey = Object.keys(doughnutDataData).sort(
      (a, b) => doughnutDataData[b] - doughnutDataData[a]
    );
    if (sortedDoughnutDataKey.length > 9) {
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
      doughnutData.labels.push("Others...");
      doughnutData.data.push(otherData);
      setDoughnutChartData(doughnutData);
    } else {
      const doughnutData = sortedDoughnutDataKey.reduce(
        (prev, key) => {
          prev.labels.push(key.length > 32 ? key.substr(0, 30) + "..." : key);
          prev.data.push(doughnutDataData[key]);
          return prev;
        },
        { labels: [], data: [] }
      );
      setDoughnutChartData(doughnutData);
    }
    setSelectedCol(name);
    const barDataData = [0, 0];
    response.forEach((row) =>
      Object.keys(row).forEach((cell) => {
        if (!row[cell]) {
          barDataData[cell === name ? 0 : 1]++;
        }
      })
    );
    const barData = {
      labels: [`${name} (${barDataData[0]})`, `Others (${barDataData[1]})`],
      data: barDataData,
    };
    setBarChartData(barData);
  };

  const startCrawler = async () => {
    try {
      const res = await CrawlerService.startCrawler();

      // console.log("eeeeeeeee", res);
      setResponse(res.data);
    } catch (error) {
      console.log("Network Error", error, error.toJson?.(), error.response);
    }
  };

  return (
    <div>
      <div>
        {!response && (
          <Button variant="primary" onClick={startCrawler}>
            Start Crawler
          </Button>
        )}
        {response && (
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={5} xl={5}>
                <Paper className={classes.paper}>
                  <DoughnutChart
                    dataCharts={doughnutChartData}
                    label={selectedCol}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} lg={5} xl={5}>
                <Paper className={classes.paper}>
                  <BarChart dataCharts={barChartData} label={selectedCol} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} lg={2} xl={2}>
                <Paper className={classes.paper} style={{ height: "100%" }}>
                  <input
                    accept="*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="outlined" color="primary" component="span">
                      Upload
                      <PublishIcon />
                    </Button>
                  </label>
                  <Button
                    href={CrawlerService.downloadSpecification}
                    variant="contained"
                    color="primary"
                  >
                    Download <GetAppIcon />
                  </Button>
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

          /* <Box>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              {dataCharts.data.length > 0 && (
                <Grid container item>
                  <Grid item>
                    <BarChart dataCharts={dataCharts} />
                  </Grid>
                  <Grid item>
                    <DoughnutChart dataCharts={dataCharts} />
                  </Grid>
                  <Grid item>
                    <LineChart dataCharts={dataCharts} />
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Link href={CrawlerService.downloadSpecification}>
                  Download Specification.xlsx
                </Link>
              </Grid>
              <Grid
                item
                style={{ display: "block", width: "100%", overflow: "auto" }}
              >
                <PaginationTableComponent
                  data={response || {}}
                  onColumnClick={setChartData}
                />
              </Grid>
            </Grid>
          </Box> */
        )}
      </div>
    </div>
  );

  //     useEffect(async () => {
  //       const result = await axios(
  //         '/api/crawler',
  //       );

  //       setData(result.data);
  //     });

  //     return (
  //       <ul>
  //         {data.hits.map(item => (
  //           <li key={item.objectID}>
  //             <a href={item.url}>{item.title}</a>
  //           </li>
  //         ))}
  //       </ul>
  //     );
}

export default Crawler;
