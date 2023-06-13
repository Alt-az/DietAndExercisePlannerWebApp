import http from "../outside_api";

class ApiDataService{
    getFood(weight,name){
        return http.get(`nutrition?query=${weight}g ${name}`)
    }

    getExercise(muscle,difficulty){
        return http.get(`exercises?muscle=${muscle}&difficulty=${difficulty}`)
    }
};

export default new ApiDataService();