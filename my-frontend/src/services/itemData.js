import http from "../http-common";

// This file is where all the API requests go.

class DataService {
    getAll(){
        return http.get(`/items`);
    }

    getAllCart(){
        return http.get(`/cartItems`);
    }

    getPizzaSpecial(){
        return http.get('/pizzaSpecial');
    }

    getComboSpecial(){
        return http.get('/comboSpecial');
    }

    getSpecialDeals(){
        return http.get('/specialDeals');
    }
}

export default new DataService();