import http from "../outside_api";

class ApiDataService{
    getFood(weight,name){
        return http.get(`nutrition?query=${weight}g ${name}`)
    }

    getExercise(name){
        return http.get(`exercises?muscle=${name}`)
    }
};

export default new ApiDataService();