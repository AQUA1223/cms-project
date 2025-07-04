class UserService {
  constructor() {
    let data = localStorage.getItem("db");
    if (data === null) {
      // if db not present in localstorage
      data = {
        users: [],
      };
      localStorage.setItem("db", JSON.stringify(data));
      this.db = data;
    } else {
      // already db present in ls
      this.db = JSON.parse(data);
    }
  }
  addUser(email, password) {
    if (this.isUserExists(email)) {
      throw new Error("user already exists");
    }
    this.db.users.push({ email, password });
    localStorage.removeItem("db");
    localStorage.setItem("db", JSON.stringify(this.db));
  }
  isUserExists(email) {
    const result = this.db.users.find((obj) => obj.email === email);
    return result !== undefined ? true : false;
  }
  authenticate(email, password) {
    const user = this.db.users.find((obj) => obj.email === email);
    if (user === undefined) {
      throw new Error("wrong email");
    }
    if (user.password !== password) {
      throw new Error("wrong password");
    }
    // Set current user in localStorage on successful login
    localStorage.setItem("currentUser", email);
  }

  getCurrentUser() {
    // Get the currently logged-in user's email
    return localStorage.getItem("currentUser");
  }

  logout() {
    // Remove the current user from localStorage
    localStorage.removeItem("currentUser");
  }

  editUserEmail(email, newEmail) {
    if (!this.isUserExists(email)) {
      throw new Error("user not exists");
    }
    this.db.users = this.db.users.map((obj) => {
      if (obj.email === email) {
        return { ...obj, email: newEmail };
      }
      return obj;
    });
    localStorage.removeItem("db");
    localStorage.setItem("db", JSON.stringify(this.db));
    // If the current user is changing their own email, update currentUser as well
    const currentUser = this.getCurrentUser();
    if (currentUser === email) {
      localStorage.setItem("currentUser", newEmail);
    }
  }

  editUserPassword(email, newPassword) {
    if (!this.isUserExists(email)) {
      throw new Error("user not exists");
    }
    this.db.users = this.db.users.map((obj) => {
      if (obj.email === email) {
        return { ...obj, password: newPassword };
      }
      return obj;
    });
    localStorage.removeItem("db");
    localStorage.setItem("db", JSON.stringify(this.db));
  }

  deleteUser(email) {
    if (!this.isUserExists(email)) {
      throw new Error("user not exists");
    }
    this.db.users = this.db.users.filter((obj) => obj.email !== email);
    localStorage.removeItem("db");
    localStorage.setItem("db", JSON.stringify(this.db));
    // If the deleted user is the current user, log them out
    const currentUser = this.getCurrentUser();
    if (currentUser === email) {
      this.logout();
    }
  }
}

const userService = new UserService();
export default userService;
