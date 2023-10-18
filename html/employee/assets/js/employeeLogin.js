"use strict";

function employeeLogin(event) {
  event.preventDefault();
  //get input from email and password inputs
  const email = $("#employeeEmail").val();
  const password = $("#employeePassword").val();
  console.log("email: ", email);
  console.log("pass: ", password);

  //get stored user data
  let users = JSON.parse(getCookie("users"));
  console.log(users)
  //console.log("stored user: ", users[0]);

  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    console.log("login: ", user.password);
    alert("Welcome back " + email + "!");
    sessionStorage.setItem("userID", user.id);
    //   // Create a session token (in a real application, make it more secure)
    //   const sessionToken = generateSessionToken();
    //   // Store the session token in a cookie
    //   setCookie("sessionToken", sessionToken, 1); // Expires in 1 day
    window.location.href = "index.html"
    // return true; // Successful login
    
    
  } else {
    if (email === "" || email === "null" || email === "undefined") {
      alert("Username required.");
    } else if (
      password === "" ||
      password === "null" ||
      password === "undefined"
    ) {
      alert("Password required.");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }
}


function logout(evt) {
  evt.preventDefault();
  sessionStorage.clear();
  window.location.href = 'auth-cover-login.html';

};

$(document).ready(() => {
  if (!checkCookieExists("users")) {
    const user1 = new EMPLOYEE(1, "ernesto@gmail.com", "ernestin");
    const user2 = new EMPLOYEE(2, "elenagomez@gmail.com", "passelena");

    var users = [user1, user2];

    users = JSON.stringify(users);

    document.cookie = `users=${users}; path=/`;
  }

  if (!checkCookieExists("tasks")) {
    const task1 = new TASK(
      1,
      2,
      "Create a website",
      "Create a riveting website that \
        will change the world",
      "Nov, 10 2023",
      "medium"
    );
    const task2 = new TASK(
      2,
      2,
      "Get the user a coffee",
      "Get your favorite \
        useristrator a hot black coffee",
      "Oct, 17 2023",
      "high"
    );
    const task3 = new TASK(
      3,
      2,
      "Take your vitamins",
      "Do not forget to drink all \
        your healthy vitamins every morning",
      "Oct, 15 2023",
      "low"
    );

    var tasks = [task1, task2, task3];

    tasks = JSON.stringify(tasks);

    document.cookie = `tasks=${tasks}; path=/`;
  }

  $("#employeeLoginBtn").click(employeeLogin);
});
