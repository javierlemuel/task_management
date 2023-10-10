"use strict";

$(document).ready( () => {

    const admin1 = new ADMIN("javier.quinones3@upr.edu", "pass1234");
    const admin2 = new ADMIN("natasha.ramos8@upr.edu", "enterpass");

    var admins = [admin1, admin2];

    admins = JSON.stringify(admins);

    document.cookie = `admins=${admins}; path=/`;


    if(!checkCookieExists("users"))
    {
        const user1 = new EMPLOYEE(1, "ernesto@gmail.com", "ernestin");
        const user2 = new EMPLOYEE(2, "elenagomez@gmail.com", "passelena");

        var users = [user1, user2];

        users = JSON.stringify(users);

        document.cookie = `users=${users}; path=/`;
    }



    if(!checkCookieExists("tasks"))
    {
        const task1 = new TASK(1, 2, "Create a website", "Create a riveting website that \
        will change the world", "Nov, 10 2023", "medium"); 
        const task2 = new TASK(2, 2, "Get the admin a coffee", "Get your favorite \
        administrator a hot black coffee", "Oct, 17 2023", "high");
        const task3 = new TASK(3, 2, "Take your vitamins", "Do not forget to drink all \
        your healthy vitamins every morning", "Oct, 15 2023", "low");

        var tasks = [task1, task2, task3];

        tasks = JSON.stringify(tasks);

        document.cookie = `tasks=${tasks}; path=/`;
    }

});







