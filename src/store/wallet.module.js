import {
    GET_WALLET,
    GET_INCOME,
    GET_WITHDRAWCASH,
} from "./actions.type";
import {
    SET_AUTH,
    SET_ERROR,
    SET_INCOME,
    SET_WITHDRAW,
    SET_WITHDRAWCASH,
} from "./mutations.type";
import ApiService from "@/service/api.service";

export const state = {
  wallet: null,
  withdraw: null
};

export const getters = {};

export const actions = {
  // 获取收支记录
    [GET_INCOME]({commit}, credentials) {
        return ApiService.post("/district/getIncomeList", credentials).then(
            ({data}) => {
                if (data.status === "ok" || data.status === "OK") {
                    return data
                } else {
                    commit(SET_ERROR, data);
                }
            }
        );
    },
  // 获取提现记录
  [GET_WALLET]({commit}, credentials) {
    return ApiService.post("/userWithdraw/getWithdrawList", credentials).then(
      ({ data }) => {
        if (data.status === "ok" || data.status === "OK") {
            return data
        } else {
          commit(SET_ERROR, data);
        }
      }
    );
  },
  // 申请提现
  [GET_WITHDRAWCASH]({
    commit
  }, credentials) {
    return ApiService.post("/userWithdraw/withdrawCash", credentials).then(
      ({data }) => {
        if (data.status === "ok" || data.status === "OK") {
          commit(SET_WITHDRAWCASH);
          return data
        } else {
          commit(SET_ERROR, data);
          return data
        }
      }
    );
  }
};

export const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations
};
