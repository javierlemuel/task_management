
// Importing packages 
const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const user = express();
user.use(bodyParser.json());
const path = require('path'); 
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt hashing
module.exports = user;

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
  //console.log('entered new route');
  //res.type('html').sendFile(path.join(__dirname, '..', 'test.html'));
  //console.log(path.join(__dirname, '..', 'admins2.html'));
  res.type('html').sendFile(path.join(__dirname, '..', 'index.html'));
  console.log(__dirname);
})

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

      //Connect to DB named 'task_management' and collection named 'employees
      await client.connect();
      const database = client.db('task_management');
      const usersCollection = database.collection('employees');
      console.log("DB connect");

      const employee = await usersCollection.findOne({ email });

      if(employee)
      {
          let result = comparePassword(String(password), String(employee['password']));
          if(result)
          {
            console.log("Succesful log in!");
            res.json({ redirect: '/employee/new-route' });
          }
      }

      // let admins = data.admins;
      // let adminExists = Object.values(admins).some(admin => admin.email === email && admin.password === password);

      // if (adminExists) {
      //   console.log("Succesful log in!");
      //     console.log('building path');

      //     // Set the content type explicitly to text/html
      //     console.log('heading to html');
      //     res.json({ redirect: '/admin/new-route' });
      //     console.log('after html');

      // } 
      else {
        console.log("Username or password is incorrect");
      }

    }

})

user.get('/getEmployees', async (req, res) => {
    const client = new MongoClient('mongodb://0.0.0.0:27017');
      //let data = readFrom("data.json");

      //Connect to DB named 'task_management' and collection named 'users'
      await client.connect();
      const database = client.db('task_management');
      const usersCollection = database.collection('employees');
      console.log("DB connect");

      // Alternatively, if using a cursor
      const cursor = usersCollection.find({});

      res.json({employees: cursor});
      // await cursor.forEach(admin => {
      //   console.log(admin.email);
      //   console.log(admin.password);
      //   console.log(admin.adminID);
      //   // ... and so on
      // });



})



user.post('/register', (req, res) => {
  try {

    let email = req.body.email;
    let password = req.body.password;



    email = email.trim();
    password = password.trim();

    if (email != "" && password != "") {
      const data = readFrom("data.json");
      const employees = data.employees;
      let adminExists = false;
      //let lastIndex = 0;

      for (let index in employees) {
        if (employees[index].email == email) {
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


// user.post('/register', async (req, res) => {

//   //const client = new MongoClient('mongodb://localhost:27017');

//   try {

//       let email = req.body.email; 
//       let password = req.body.password;

//       email = email.trim();
//       password = password.trim();

//       if(email != "" && password != "")
//       {
//           // client.connect();
//           // const database = client.db('test');
//           // const usersCollection = database.collection('users');

//           // const user = await usersCollection.findOne({ email });

//           if (user) {

//               //if user found, cookie message = username/email already exists
//               res.send('Email already exists!');
//               //res.cookie('message', 'Email already exists!');
//           } else {
//               //insert query
//               res.send('Account created!');
//           }
//       }
//       else
//       {
//           res.send('Email and password cannot be empty!');
//           //res.cookie('message', 'Email and password cannot be empty!');
//       }

//       //res.redirect('/landingPage.html');
      

//   } catch (err) {
//       res.send(err);
//       //console.error(err);
//    } //finally {
//       //await client.close();
//   //}
  
// })

