const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const user = express();
user.use(bodyParser.json());
const path = require('path'); 
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt hashing
module.exports = user;
const classes = require('../assets/js/classes');

function writeTo(file, data) {
  fs.writeFile(file, JSON.stringify(data), "utf8", (err) => {
    throw err;
  });
}

function readFrom(file) {
  if (fs.existsSync(file)) {
    let data = fs.readFileSync(file, "utf-8");
    data = JSON.parse(data);
    return data;
  }
}

// compare password
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}


user.use(express.json());

user.get('/new-route', (req, res) => {
  res.type('html').sendFile(path.join(__dirname, '..', 'accounts.html'));
<<<<<<< Updated upstream
})

user.get('/adminsPage', (req, res) => {
  res.type('html').sendFile(path.join(__dirname, '..', 'admins2.html'));
})

user.get('/employeesPage', (req, res) => {
  res.type('html').sendFile(path.join(__dirname, '..', 'accounts.html'));
})
=======
})

user.get('/admins', (req, res) => {
  res.type('html').sendFile(path.join(__dirname, '..', 'admins2.html'));
});
>>>>>>> Stashed changes

user.post('/login', async function(req, res) {

    let email = req.body.email;
    let password = req.body.password;
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
        console.log("No email or password provided");
        res.status(400).json({ error: "Both email and password are required." });
    } else {
      const client = new MongoClient('mongodb://0.0.0.0:27017');
      //let data = readFrom("data.json");

      //Connect to DB named 'task_management' and collection named 'users'
      await client.connect();
      const database = client.db('task_management');
      const usersCollection = database.collection('admins');
      console.log("DB connect");

      const admin = await usersCollection.findOne({ email });



      if(admin)
      {
          let result = comparePassword(String(password), String(admin['password']));
          if(result)
          {
            console.log("Succesful log in!");
            res.json({ redirect: '/admin/new-route', cookie: admin._id.toString()});
          }
      }
      else {
        console.log("Username or password is incorrect");
      }

    }

})

user.get('/getAdmins', async (req, res) => {
  const client = new MongoClient('mongodb://0.0.0.0:27017');

  try {
      //conncet to db
      await client.connect();
      const database = client.db('task_management');
      const usersCollection = database.collection('admins');
      console.log('DB connected');

      //get admins
      const admins = await usersCollection.find({}).toArray();

      res.json({ admins });
  } catch (error) {
      console.error('Error retrieving admins:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      await client.close();
  }
});

user.post('/createAdmin', async function(req, res) {

  let email = req.body.email;
  let password = req.body.password;
  email = email.trim();
  password = password.trim();

  if (!email || !password) {
      console.log("No email or password provided");
      res.status(400).json({ error: "Both email and password are required." });
  } else {
    const client = new MongoClient('mongodb://0.0.0.0:27017');
    try{

        await client.connect();
        const database = client.db('task_management');
        const usersCollection = database.collection('admins');
        console.log("DB connect");

        const employee = await usersCollection.findOne({ email });

        if(!employee)
        {
          console.log('no existe el email.');
          const adminToInsert = { "email": email, "password": password, "status":"active"};
          console.log('data: ', adminToInsert);
          // Insert the data into the collection
          const result = await usersCollection.insertOne(adminToInsert);
          console.log(`Inserted ${result.insertedCount} document(s)`);
        }
        else {
          console.log("Email already exists");
        }
    } finally {
      // Close the MongoDB connection
      await client.close();
      console.log('Connection closed');
    }

  }

})


user.post("/getEmployees", async (req, res) => {

      console.log("getEmployees entered");
      adminID = req.body.adminID;
      adminID = new ObjectId(adminID);
      console.log(adminID);

      const client = new MongoClient('mongodb://0.0.0.0:27017');

      await client.connect();
      const database = client.db('task_management');
      const usersCollection = database.collection('team');
      console.log("DB connect");

      // Alternatively, if using a cursor
      const cursor = await usersCollection.find({ admin: adminID }).toArray();
      const employeeIDs = cursor.map(doc => doc.employees);
      const employeesArray = [];
      await console.log("IDs: " , cursor);

      for (const employeeId of employeeIDs[0]) {
        //const employeeObjectId = new ObjectId(employeeId);
        const employeeCollection = database.collection('employee');
        const employee = await employeeCollection.findOne({ _id: employeeId });
  
        // Add the employee details to the array
        employeesArray.push(employee);
      }

      //console.log(employeesArray);

      res.json({employees: employeesArray});

})



user.post('/register', (req, res) => {
  try {

    let email = req.body.email;
    let password = req.body.password;



    email = email.trim();
    password = password.trim();

    if (email != "" && password != "") {
      const data = readFrom("data.json");
      const admins = data.admins;
      let adminExists = false;
      //let lastIndex = 0;

      for (let index in admins) {
        if (admins[index].email == email) {
          res.send("Username exists");
          userExists = true;
        }

        lastIndex = parseInt(index);
      }

      if (!userExists) {
        let user = {
          username: username,
          password: password
        };

        data.users[`${lastIndex + 1}`] = user;

        writeTo("data.json", data);

        res.send({
          message: "Successfull",
          user: user
        });
      }
    } else {
      res.send('The username and password can`t be empty');
    }
  }
  catch (error) {
    res.status(400).send('Invalid JSON data');
  }

})

