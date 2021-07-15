const express = require("express");
const cors = require("cors");
const {db : destinations} = require("./DB")
const { getRandomId} = require("./HELPERS")
const server = express();
server.use(express.json());
server.use(cors());



// CRUD
// CREATE => POST
server.post("/destinations", (req, res) => {
  destinations.push(req.body);
  
  const _id = getRandomId();

  const {name, location, photo, description} = req.body;

  destinations[_id] ={_id, name, location, photo, description};

  res.send({ status: "success" });
});

// READ => GET
server.get("/destinations", (req, res) => {
  res.send(destinations);
});

// UPDATE => PUT
server.put("/destinations", (req, res) => {
    const {_id} = req.query; // same below
  //const _id = req.query._id;
    console.log(_id);
    console.log(destinations);
  if (_id === undefined) {
      return res.status(400).send({message: "?_id required"});
  }

  const dest =destinations[_id];

  if (dest === undefined){
      return res.status(410).send({message: "no destination with that _id to update"});
  }

  
  const { name, location, photo, description} = req.body;

  if (name !== undefined) {
      dest.name = name;
  }

  if (location !== undefined) {
    dest.location = location;
}

if (photo !== undefined) {
    dest.photo = photo;
}

if (description !== undefined) {
    dest.description = description;
}

res.send({status: "success"});


});

// DELETE => DELETE
server.delete("/destinations", (req, res) => {
  const { _id } = req.query;

  if (_id === undefined) {
    return res.status(400).send({message: "?_id required"});
}

if (dest === undefined){
    return res.status(410).send({message: "no destination with that _id to update"});
}

delete destinations[_id];

res.send({status: "success"});
  // go find the object with that id and delete from the array
});

server.listen(3000, () => {
  console.log("Server listening");
});