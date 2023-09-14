import http from "../http-common";

// This file is where all the User API requests go.

class UserService {
    async login(username, password) {
        const res = await http.post(`/user/login`, {
            username: username,
            password: password,
        });
        return res;
    }
}

export default new UserService();
