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
    if(user.status == 'inactive')
      alert("Account inactive. Please contact an admin.");
    else{
      console.log("login: ", user.password);
      alert("Welcome back " + email + "!");
      sessionStorage.setItem("userID", user.id);

      window.location.href = "index.html";
    } 
   
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
    const task1 = new TASK(1, 2, "Create a website", "Create a riveting website that will change the world", "2023-11-10", "medium"); 
        const task2 = new TASK(1, 1, "Get the admin a coffee", "Get your favorite administrator a hot black coffee", "2023-10-17", "high");
        const task3 = new TASK(2, 2, "Take your vitamins", "Do not forget to drink all your healthy vitamins every morning", "2023-10-15", "low");
        const task4 = new TASK(3, 2, "Take your dog off the lawn", "Do not forget to drink all your healthy vitamins every morning", "2023-10-15", "low");
        const task5 = new TASK(2, 1, "Do your homework", "Do not forget to drink all your healthy vitamins every morning", "2023-10-15", "low");

        var tasks = [task1, task2, task3, task4, task5];

        setCookie("tasks", tasks)
  }

  $("#employeeLoginBtn").click(employeeLogin);
});
