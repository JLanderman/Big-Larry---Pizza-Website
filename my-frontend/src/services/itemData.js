import http from "../http-common";

// This file is where all the API requests go.


class DataService {
    getAll(){
        return http.get(`/items`);
    }
}

export default new DataService();