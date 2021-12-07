var express = require('express');
var router = express.Router();
const fs = require('fs');
const fileName = 'events.json';

let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Fetch all the data
// Get request
router.get('/', function (req, res) {
  res.send(data);
});

// Fetch single event data
// get Request
router.get('/:id', function (req, res) {
  //Check if provided id exists
  const found = data.some((event) => event.id === req.params.id);

  if (found) {
    //single = data.filter((event) => event.id === req.params.id);

    var single = data.filter((obj) => {
      return obj.id === req.params.id;
    })[0];
    res.send(single);
  } else {
    res.status(400).json({ msg: 'No Such Event' });
  }
});

// Post request
// Add a new event to data
router.post('/', (req, res) => {
  var objects = {}; // empty object for seat data
  var arr = []; // array to hold the seats and ids

  for (var x = 0; x < parseInt(req.body.total_seats); x++) {
    arr.push((objects[x] = { booked: false, id: x + 1 }));
  }

  //console.log(arr);

  const newEvent = {
    id: req.body.id,
    event_name: req.body.event_name,
    church_name: req.body.chname,
    total_seats: parseInt(req.body.total_seats),
    date: req.body.date,
    seats: arr,
    people: [],
  };

  const found = data.some((event) => event.id === req.body.id);

  if (!found) {
    try {
      data.push(newEvent);
      fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
      res.send(newEvent);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.status(400).json({ msg: `Event of ID ${req.body.id} already exists` });
  }
});

// Delete Request
// Delete Event

router.delete('/:id', function (req, res) {
  //Check if provided id exists
  const found = data.some((event) => event.id === req.params.id);
  console.log(found);
  if (found) {
    data = data.filter((event) => event.id !== req.params.id);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    //res.status(200).json({ msg: 'No Such Event' });
    res.end();
  } else {
    res.status(400).json({ msg: 'No Such Event' });
  }
});

//Put Request
// Book a seat
router.put('/:id', (req, res) => {
  let picks = req.body.picks;
  let newperson = req.body;

  //check if the event exists
  const found = data.some((event) => event.id === req.params.id);

  if (found) {
    //Select Single Event
    let single = data.filter((obj) => {
      return obj.id === req.params.id;
    })[0];

    single.seats.forEach((seat) => {
      if (picks.includes(seat.id)) {
        seat.booked = true;
      }
    });

    single = {
      ...single,
      people: [...single.people, newperson],
    };

    data.map((e, i) => {
      if (e.id === req.params.id) {
        data[i] = single;
      }
    });
    //data = [...data, single];

    try {
      fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
      res.send(single);
    } catch (error) {
      res.json({ msg: 'Booking Failed' });
    }
  } else {
    res.status(400).json({ msg: 'Id not Found' });
  }
});

module.exports = router;
