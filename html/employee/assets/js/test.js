"use strict";

function adminLogin(evt) {
    evt.preventDefault();
    //get input from email and password inputs
    const email = $("#Email").val();
    const password = $("#Password").val();
    console.log("email: ", email);
    console.log("pass: ", password);

    //get stored user data
    let admins = JSON.parse(getCookie("admins"));
    //console.log("stored admin: ", admins[0]);

    const admin = admins.find(admin => admin.email == email && admin.password == password);
    if (admin) {
        console.log("login: ", admin.password);
        alert("Welcome back "+ email + "!");
        sessionStorage.setItem("adminID", admin.id);
        window.location.href = "accounts.html";
    //   // Create a session token (in a real application, make it more secure)
    //   const sessionToken = generateSessionToken();
    //   // Store the session token in a cookie
    //   setCookie("sessionToken", sessionToken, 1); // Expires in 1 day
    //   return true; // Successful login
    } else {
        if (email === "" || email === "null" || email === "undefined") {
          alert("Username required.");
        } else if (password === "" || password === "null" || password === "undefined") {
          alert("Password required.");
        } else {
          alert("Invalid email or password. Please try again.");
        }
      }
    
      
  };

function logout(evt) {
    evt.preventDefault();
    sessionStorage.clear();
    window.location.href = "login.html";

};

$(document).ready( () => {

    

    if(!checkCookieExists("admins"))
    {
        const admin1 = new ADMIN(1, "javier.quinones3@upr.edu", "pass1234");
        const admin2 = new ADMIN(2, "natasha.ramos8@upr.edu", "enterpass");
        admin1.notifications.push("Elena has finished a task!");

        var admins = [admin1, admin2];
        admins[0]['userlist'].push(1);
        admins[1]['userlist'].push(2);

    setCookie("admins", admins);
    }
    


    if(!checkCookieExists("users"))
    {
        const user1 = new EMPLOYEE(1, "ernesto@gmail.com", "ernestin");
        const user2 = new EMPLOYEE(2, "elenagomez@gmail.com", "passelena");

        var users = [user1, user2];


        setCookie("users", users);
    }

    if(!checkCookieExists("tasks"))
    {
        const task1 = new TASK(1, 2, "Create a website", "Create a riveting website that will change the world", "2023-11-10", "medium"); 
        const task2 = new TASK(1, 1, "Get the admin a coffee", "Get your favorite administrator a hot black coffee", "2023-10-17", "high");
        const task3 = new TASK(2, 2, "Take your vitamins", "Do not forget to drink all your healthy vitamins every morning", "2023-10-15", "low");
        const task4 = new TASK(3, 2, "Take your dog off the lawn", "Do not forget to drink all your healthy vitamins every morning", "2023-10-15", "low");
        const task5 = new TASK(2, 1, "Do your homework", "Do not forget to drink all your healthy vitamins every morning", "2023-10-15", "low");

        var tasks = [task1, task2, task3, task4, task5];


        setCookie("tasks", tasks)
    }

    $("#loginBtn").click(adminLogin);  
    $("#logoutbtn").click(logout);

    $("#savebtn").click(function() {
        alert("Account information has been saved!");
    });

    $(".email_tab").mouseover(function() {
        $(".email_tab").css("cursor", "pointer");
    });

    $(".email_tab").mouseout(function() {
      $(".email_tab").css("cursor", "default");
  });


});







