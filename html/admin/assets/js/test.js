"use strict";

function adminLogin(evt) {
    evt.preventDefault();
    //get input from email and password inputs
    const email = $("#Email").val();
    const password = $("#Password").val();
    console.log("email: ", email);

    //get stored user data
    let admins = JSON.parse(getCookie("admins"));

    const admin = admins.find(admin => admin.email == email && admin.password == password);
    if (admin) {
        console.log("login: ", admin.password);
        alert("Welcome back "+ email + "!");
        sessionStorage.setItem("adminID", admin.id);
        window.location.href = "accounts.html";

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
        admins[0]['userlist'].push(3);
        admins[0]['userlist'].push(5);
        admins[1]['userlist'].push(2);
        admins[1]['userlist'].push(4);

    //create admin cookie
    setCookie("admins", admins);
    }
    


    if(!checkCookieExists("users"))
    {
        const user1 = new EMPLOYEE(1, "ernesto@gmail.com", "ernestin");
        const user2 = new EMPLOYEE(2, "elenagomez@gmail.com", "passelena");
        const user3 = new EMPLOYEE(3, "reynaldodiaz@gmail.com", "reyelmejor");
        const user4 = new EMPLOYEE(4, "javiermelendez@gmail.com", "javier1234");
        const user5 = new EMPLOYEE(5, "mariarios@gmail.com", "mariabros");

        var users = [user1, user2, user3, user4, user5];


        setCookie("users", users);
    }

    if(!checkCookieExists("tasks"))
    {
        const task1 = new TASK(1, 2, "Create a web component", "Create a riveting web component that will change the world", "2023-11-15", "high"); 
        const task2 = new TASK(1, 1, "Get the admin a coffee", "Get your favorite administrator a hot black coffee", "2023-11-02", "medium");
        const task3 = new TASK(2, 2, "Cybertech Meeting", "Do not forget to book the meeting for next week!", "2023-11-07", "medium");
        const task4 = new TASK(3, 2, "USB Order", "Order the package of USBs specified at the meeting", "2023-11-10", "low");
        const task5 = new TASK(2, 1, "Call designers for development meeting", "Do not forget to contact the designers from the \
        development team for our upcoming meeting", "2023-11-02", "high");

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







