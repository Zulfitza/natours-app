const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
});

app.post('/api/v1/tours', (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const tour = { id, ...req.body };
  console.log(tour);
  tours.push(tour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, undefined, 4),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour } });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
