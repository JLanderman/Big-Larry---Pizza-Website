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

    async editUserCred(username, newUsername, newPassword, token) {
        const res = await http.post(`/user/editUser`, {
            username: username,
            newUsername: newUsername,
            newPassword: newPassword,
            token: token
        });
        return res;
    }

    async getUserbyToken(token) {
        const res = await http.post(`/user/retrieveToken`, {
       token});
        return res.data.username;
    }
};
const userServiceInstance = new UserService();
export default userServiceInstance;
