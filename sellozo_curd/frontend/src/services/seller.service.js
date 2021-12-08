import http from "../http-common";


class SellerDataService {
  getAll() {
    return http.get("/seller");
  }

  get(id) {
    return http.get(`/seller/${id}`);
  }

  create(data) {
    return http.post("/seller", data);
  }

  update(id, data) {
    return http.put(`/seller/${id}`, data);
  }

  delete(id) {
    return http.delete(`/seller/${id}`);
  }

  deleteAll() {
    return http.delete(`/seller`);
  }

  findBySname(sName) {
    return http.get(`/product?sName=${sName}`);
  }
}

export default new SellerDataService();