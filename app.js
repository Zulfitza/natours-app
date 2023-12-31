const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
};

const getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === +req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: tours.find((tour) => tour.id === +req.params.id) },
  });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (!tours.find((tour) => tour.id === +req.params.id)) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<UPDATED TOUR>',
    },
  });
};

const deleteTour = (req, res) => {
  if (!tours.find((tour) => tour.id === +req.params.id)) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).get(getTour).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
