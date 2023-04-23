import http from "../http-common";

// This file is where all the API requests go.


class DataService {
    getAll(){
        return http.get(`/items`);
    }

    getAllCart(){
        return http.get(`/cartItems`);
    }
}

export default new DataService();