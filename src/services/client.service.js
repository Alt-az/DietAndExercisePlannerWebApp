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
}
export default new ClientDataService();