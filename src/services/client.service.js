import http from "../http-common";

export default class ClientDataService {
  getAll() {
    return http.get("/clients");
  }

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

  findByLogin(login) {
    return http.get(`/clients?login=${login}`);
  }
}