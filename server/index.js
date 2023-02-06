const express = require ("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());

//Routes


//create a location

app.post("/locations", async (req, res) => {
    try {
      const { description } = req.body;
      const newLocation = await pool.query(
        "INSERT INTO table_orca (description) VALUES($1) RETURNING *",
        [description]
      );
  
      res.json(newLocation.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get all locations
  
  app.get("/locations", async (req, res) => {
    try {
      const allLocations = await pool.query("SELECT * FROM table_orca"
      );
      res.json(allLocations.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get a location
  
  app.get("/locations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const location = await pool.query("SELECT * FROM table_orca WHERE o_id = $1", [
        id
      ]);
  
      res.json(table_orca.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a Location
  
  app.put("/locations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateLocations = await pool.query(
        "UPDATE table_orca SET description = $1 WHERE o_id = $2",
        [description, id]
      );
  
      res.json("Location was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a location
  
  app.delete("/locations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletelocation = await pool.query(
        "DELETE FROM table_orca WHERE o_id = $1",
         [id ]
         );
      res.json("Location was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(8000, () => {
    console.log("server has started on port 8000");
})