"use strict";

$(document).ready( () => {

    const admin1 = new ADMIN("javier.quinones3@upr.edu", "pass1234");
    const admin2 = new ADMIN("natasha.ramos8@upr.edu", "enterpass");

    var admins = [admin1, admin2];

    admins = JSON.stringify(admins);

    document.cookie = `admins=${admins}; path=/`;


    const user1 = new EMPLOYEE(1, "ernesto@gmail.com", "ernestin");
    const user2 = new EMPLOYEE(2, "elenagomez@gmail.com", "passelena");

    var users = [user1, user2];

    users = JSON.stringify(users);

    document.cookie = `users=${users}; path=/`;

});







