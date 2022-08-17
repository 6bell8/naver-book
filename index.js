const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const NAVER_ID = process.env.NAVER_ID;
const Naver_Client_Secret = process.env.Naver_Client_Secret;

app.set("port", process.env.PORT || 8099);
const port = app.get("port");

app.use(cors());

//라우팅
app.get("/", (req, res) => {
  res.send("안녕 만나서 방가오");
});
app.get("/book/:bookname", (req, res) => {
  const queryTxt = encodeURIComponent(req.params.bookname);
  //   console.log(req.params.bookname); //뒤에 : 찍을 때는 params으로 받으면 됨
  axios({
    url: `https://openapi.naver.com/v1/search/book.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": Naver_Client_Secret,
    },
  }).then(function (response) {
    // console.log(response.data);
    res.json(response.data);
  });
});

//중간 대리인

app.get("/book02", (req, res) => {
  const queryTxt = encodeURIComponent(req.query.bookname);
  axios({
    url: `https://openapi.naver.com/v1/search/book.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": Naver_Client_Secret,
    },
  }).then(function (response) {
    res.json(response.data);
  });
});

app.get("/login", (req, res) => {
  console.log(req.query);

  if (req.query.id === "parkgu" && req.query.pw === "1234") {
    res.json({ isLogged: true });
  } else {
    res.json({ isLogged: false });
  }
});

app.listen(port, () => {
  console.log(`${port}번에서 서버 대기중`);
});
