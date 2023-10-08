class ADMIN {
    constructor(email, pass) {
        this.email = email;
        this.password = pass;
    }
}


class EMPLOYEE {
    constructor(id, email, pass) {
        this.id = id;
        this.email = email;
        this.password = pass;
        this.status = 'active';
        this.tasks = [];
        this.completed_tasks = [];
        this.notifications = [];
    }
}

function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null; // Cookie not found
  }