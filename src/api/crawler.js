import request from "./BaseApi";

const currentServiceUrl = process.env.REACT_APP_LOCAL_URL_CRAWLER;

function startCrawler() {
  console.log({ currentServiceUrl });
  return request({
    url: `${currentServiceUrl}/api/crawler`,
    method: "get",
    data: null,
  });
}

function uploadFile(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("field_name", 23);
  return request({
    url: `${currentServiceUrl}/api/upload`,
    method: "post",
    data,
  });
}

const downloadSpecification = `${currentServiceUrl}/api/download`;

const CrawlerService = {
  startCrawler,
  uploadFile,
  downloadSpecification,
};

export default CrawlerService;
