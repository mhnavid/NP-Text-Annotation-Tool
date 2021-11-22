const express = require('express')
const exportController = require('./exportController');
const cors = require("cors");
const app = express()
const port = 4000

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.post('/export-csv', (req, res) => {
    exportController.exportDataToCSV(req, res);
})

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})