import http from "../http-common";

// This file is where all the API requests go.


class DataService {
    getAll(){
        return http.get(`/items`);
    }

    getAllCart(){
        return http.get(`/cartItems`);
    }

    getAllLunch()
    {
        return http.get(`/lunchItems`);
    }
}

export default new DataService();