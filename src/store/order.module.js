import {GET_ORDERS, GET_TODAYLIST,GET_INCOMELIST} from "./actions.type";
import {SET_ORDERS, SET_ERROR} from "./mutations.type";
import ApiService from "@/service/api.service";

export const state = {
  orders: null
};

export const getters = {};

export const actions = {
  [GET_ORDERS]({ commit }, config) {
    ApiService.post("/sopHousingOrder/getUserOrders", config).then(
      ({ data }) => {
        if (data.status === "ok" || data.status === "OK") {
          commit(SET_ORDERS);
        } else {
          commit(SET_ERROR, data);
        }
      }
    );
  },
  //订单列表
  [GET_TODAYLIST]({commit}, credentials) {
      return ApiService.post("/district/getDistrictOrder", credentials).then(
          ({data}) => {
              if (data.status === "ok" || data.status === "OK") {
                  return data
              } else {
                  commit(SET_ERROR, data);
                  return data
              }
          }
      );
  },
};

export const mutations = {
  [SET_ORDERS](state) {
    state.orders = "orders";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
