import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;

//enable cors to accept different origins
app.use(cors());

//endpoint get /motdata
app.get("/trade/vehicles/mot-tests", async (req, res) => {
  const registration = req.query.registration;
  const url = `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${registration}`;
  const response = await fetch(url, {
    headers: {
      "x-api-key": "fZi8YcjrZN1cGkQeZP7Uaa4rTxua8HovaswPuIno",
      Accept: "application/json+v6",
    },
    method: "GET",
  });
  const resJSON = await response.json();
  return res.send(resJSON);
});

app.listen(port, () => {
  console.log(`MOT Proxy listening on port ${port}`);
  if (!port) throw new Error("there is no port");
});
