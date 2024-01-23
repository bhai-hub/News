const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require('cors');

const targetUrl = "https://www.ndtv.com/latest"; // Replace with the URL you want to scrape

app.set("view engine", "ejs");
app.use(cors());

var i = 8;

const collection = [
  {
    website: "https://www.ndtv.com/latest",
    from: "ndtv",
  },
  {},
];

app.get("/", async (req, res) => {
  const news = [];

  await axios
    .get(targetUrl)
    .then((response) => {
      const $ = cheerio.load(response.data);

      // Now you can use jQuery-like syntax to select elements and extract data

      $(".news_Itm").each((index, element) => {
        const title = $(element).find(".newsHdng").text();
        const link = $(element).find("a").attr("href");
        // const link = $('.newsHdng>a').attr('href')
        const content = $(element).find(".newsCont").text();
        const img = $(element).find("img").attr("src");
        // const author = $('.posted-by > a').text()
        news.push({
          title,
          link,
          img,
          content,
        });
      });
      // console.log('Titles:', news);
    })
    .catch((error) => {
      console.error("Error fetching the page:", error);
    });

    res.json(news)

  // res.render("index", { data: news });
});

app.get("/page/:no", async (req, res) => {
  const no = req.params.no;
  const page = targetUrl + "/page-" + no;
  const pageNews = [];
  await axios
    .get(page)
    .then((response) => {
      const $ = cheerio.load(response.data);

      // Now you can use jQuery-like syntax to select elements and extract data

      $(".news_Itm").each((index, element) => {
        const title = $(element).find(".newsHdng").text();
        const link = $(element).find("a").attr("href");
        // const link = $('.newsHdng>a').attr('href')
        const content = $(element).find(".newsCont").text();
        const img = $(element).find("img").attr("src");
        // const author = $('.posted-by > a').text()
        pageNews.push({
          title,
          link,
          img,
          content,
        });
      });
      const length = []
      $(".listng_pagntn").each((index, element)=>{
        const number = $(element).find('a').text()
        length.push(number)
      })
      console.log(length.length())
      // console.log('Titles:', news);

      res.json(pageNews)

      // res.render("index", { data: pageNews });
    })
    .catch((error) => {
      // console.error('Error fetching the page:', error);
      // res.send("<h4>Url doesnt exit</h4><br><a href='/1'>go back to page 1</a>")
      res.redirect("/");
    });
});

// app.get("/science", async (req, res) => {
//   const url = "https://www.ndtv.com/science";
//   const sciencNews = [];
//   await axios
//     .get(url)
//     .then((response) => {
//       const $ = cheerio.load(response.data);

//       // Now you can use jQuery-like syntax to select elements and extract data

//       $(".news_Itm").each((index, element) => {
//         const title = $(element).find(".newsHdng").text();
//         const link = $(element).find("a").attr("href");
//         // const link = $('.newsHdng>a').attr('href')
//         const content = $(element).find(".newsCont").text();
//         const img = $(element).find("img").attr("src");
//         // const author = $('.posted-by > a').text()
//         sciencNews.push({
//           title,
//           link,
//           img,
//           content,
//         });
//       });

//       const lengths = []
//       $('.listng_pagntn>a').each((index,element)=>{
//         const len = $(element).text()
//         lengths.push({len})
//       })
//       console.log(lengths[0]);

//       res.render("index", { data: sciencNews });
//     })
//     .catch((error) => {
//       console.error("Error fetching the page:", error);
//       // res.send("<h4>Url doesnt exit</h4><br><a href='/1'>go back to page 1</a>")
//       //   res.redirect("/");
//     });
// });

app.listen(3000, () => {
  console.log("listening");
});
