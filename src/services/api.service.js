import http from "../outside_api";

class ApiDataService{
    get(weight,name){
        return http.get(`nutrition?query=${weight}g ${name}`)
    }
};

export default new ApiDataService();