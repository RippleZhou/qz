import Vue from "vue";

const ApiService = {
  init() {
    // Vue.axios.defaults.baseURL = API_URL;
  },

  query(resource, params) {
    return Vue.axios.get("/warden/"+resource, params).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get("/warden/"+`${resource}/${slug}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post("/warden/"+`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put("/warden/"+`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete("/warden/"+resource).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  }
};

export default ApiService;
