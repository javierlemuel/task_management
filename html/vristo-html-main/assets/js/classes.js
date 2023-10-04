class ADMIN {
    constructor(email, pass) {
        this.email = email;
        this.password = pass;
    }
}


class EMPLOYEE {
    constructor(email, pass) {
        this.email = email;
        this.password = pass;
        this.tasks = [];
        this.completed_tasks = [];
        this.notifications = [];
    }
}