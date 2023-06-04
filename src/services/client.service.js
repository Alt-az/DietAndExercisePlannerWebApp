import http from "../http-common";

class ClientDataService {

  get(id) {
    return http.get(`/clients/${id}`);
  }

  create(data) {
    return http.post("/clients", data);
  }

  update(id, data) {
    return http.put(`/clients/${id}`, data);
  }

  delete(id) {
    return http.delete(`/clients/${id}`);
  }

  deleteAll() {
    return http.delete(`/clients`);
  }

  findByEmail(email) {
    return http.get(`/clients?email=${email}`);
  }

  addFood(id,food){
    return http.put(`/diets/${id}`,food);
  }
  async getFood(id){
    return http.get(`/food/${id}`);
  }
  deleteFood(id){
    return http.delete(`foodList/${id}`);
  }
  addExercise(id,exercise){
    return http.put(`/exercise/${id}`,exercise);
  }
  async getExercises(id){
    return http.get(`/exercises/${id}`);
  }
  deleteExercises(id){
    return http.delete(`/exercises/${id}`);
  }
}
export default new ClientDataService();