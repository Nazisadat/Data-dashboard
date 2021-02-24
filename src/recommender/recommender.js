import { React, useState } from "react";
import "./recommender.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Paper, Container, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import axios from "axios";
import { AiFillSetting, AiFillStar } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Recommender() {
  const classes = useStyles();

  // React hooks
  const [input, setInput] = useState("");
  const [bomsid, setBomsid] = useState("");
  const [apiResponse, setApiResonse] = useState("");
  const [data, setdata] = useState("");
  const [popularData, setPopular] = useState("");

  // API Function
  function handleSubmit(e) {
    e.preventDefault();
    setBomsid(input);
    let host = process.env.REACT_APP_LOCAL_URL_RECOMMENDER;
    console.log("host");
    console.log(host);
    let API_ROUTE_TEST = "/api/recomender/name/";
    let API_ROUTE_PROD = "/api/recomender/boms/";
    let API_URL = "/api/recomender/name/";

    // if (process.env.NODE_ENV === "development") {
    //   host = process.env.REACT_APP_TEST_URL;
    //   API_URL = API_ROUTE_TEST;
    // } else if (process.env.NODE_ENV === "production") {
    //   host = process.env.REACT_APP_PROD_URL;
    //   API_URL = API_ROUTE_PROD;
    // } else {
    //   host = process.env.REACT_APP_LOCAL_URL;
    //   let API_URL = "/api/recomender/boms/";
    // }

    console.log(host);

    const API_ROUTE = `${host}${API_URL}${input}`;
    console.log(API_ROUTE);
    axios
      .post(
        API_ROUTE,
        { bom_id: input },
        {
          cache: "no-cache",
        }
      )
      .then((res) => {
        const json = res.data;
        // setApiResonse(json);
        const api_result = Object.keys(json).map((key) => [key, json[key]]);
        const data_array = api_result[0][1];
        const data = data_array[0];
        setdata(data);
      });
  }

  function handlePopularsubmit(e) {
    e.preventDefault();
    let host = process.env.REACT_APP_LOCAL_URL_RECOMMENDER;
    let API_ROUTE_TEST = "/api/recomender/simillar";

    // if (process.env.NODE_ENV === "development") {
    //   host = process.env.REACT_APP_TEST_URL;
    // } else if (process.env.NODE_ENV === "production") {
    //   host = process.env.REACT_APP_PROD_URL;
    // } else {
    //   host = process.env.REACT_APP_LOCAL_URL;
    // }

    const API_ROUTE = `${host}${API_ROUTE_TEST}`;
    console.log(API_ROUTE);

    axios.get(API_ROUTE).then((res) => {
      const json = res.data;
      // setApiResonse(json);
      const api_result = Object.keys(json).map((key) => [key, json[key]]);
      const data_array = api_result[0][1];
      const data = data_array[0];
      setPopular(data);
    });
  }

  // API response reformating
  const boms = Object.keys(data).map(function (d) {
    return [d, data[d]];
  });

  const boms_simillar = Object.keys(popularData).map(function (d) {
    return [d, popularData[d]];
  });

  return (
    <div className="recommender">
      <Container>
        <Paper>
          <Box
            display="flex"
            justifyContent="center"
            p={1}
            bgcolor="background.paper"
          >
            <Box>
              <InputLabel htmlFor="input-with-icon-adornment">
                Enter Product Name:
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <PlayArrowIcon />
                  </InputAdornment>
                }
                onChange={(e) => setInput(e.target.value)}
              />
            </Box>
            <Box p={1} ml={2}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleSubmit}
              >
                Recommend Me !
              </Button>
            </Box>
            <Box p={1} ml={2}>
              <Button
                type="submit"
                onClick={handlePopularsubmit}
                variant="outlined"
                color="secondary"
                className={classes.button}
              >
                popular products
              </Button>
            </Box>
          </Box>
          <Box style={{ whiteSpace: "wrap" }}>
            {data && (
              <div className="recommender">
                <h5 style={{ display: "flex", justifyContent: "start" }}>
                  Simillar Products
                </h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    whiteSpace: "pre",
                  }}
                >
                  {boms.map((bom) => (
                    <div style={{ maxWidth: "260px", minWidth: "260px" }}>
                      <div className="stati bg-belize_hole left">
                        <i className="icon-mustache icons">
                          <AiFillSetting />
                        </i>
                        <div>
                          <b>{bom[0]}</b>
                          <span>{bom[1]}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {popularData && (
              <div>
                <h5>Popular Products</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    whiteSpace: "normal",
                  }}
                >
                  {boms_simillar.map((bom) => (
                    <div style={{ maxWidth: "200px" }}>
                      <div className="stati bg-peter_river left">
                        <i className="icon-mustache icons">
                          <AiFillStar />
                        </i>
                        <div>
                          <b>{bom[0]}</b>
                          <span>{bom[1]}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Recommender;
