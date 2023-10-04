"use strict";

$(document).ready( () => {
    sessionStorage.clear();

    const admin1 = new ADMIN("javier.quinones3@upr.edu", "pass1234");
    const admin2 = new ADMIN("natasha.ramos8@upr.edu", "enterpass");

    const admins = [admin1, admin2];

    sessionStorage.setItem("admins", JSON.stringify(admins));


    const user1 = new EMPLOYEE("ernesto@gmail.com", "ernestin");
    const user2 = new EMPLOYEE("elenagomez@gmail.com", "passelena");

    const users = [user1, user2];

    sessionStorage.setItem("users", JSON.stringify(users));

});







