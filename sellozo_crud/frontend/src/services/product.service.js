import http from "../http-common";


class ProductDataService {
  getAll() {
    return http.get("/product");
  }

  get(id) {
    return http.get(`/product/${id}`);
  }

  create(data) {
    return http.post("/product", data);
  }

  update(id, data) {
    return http.put(`/product/${id}`, data);
  }

  delete(id) {
    return http.delete(`/product/${id}`);
  }

  deleteAll() {
    return http.delete(`/product`);
  }

  findByPname(pName) {
    return http.get(`/product?pName=${pName}`);
  }
}

export default new ProductDataService();