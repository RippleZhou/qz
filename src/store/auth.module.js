import {
  SIGN_IN,
  GET_USERPAYPW,
  GET_PAY_PW,
  PASSWORD_RESET,
  GET_STOREACCOUNTINFO,
  GET_CAPTCHA,
  GET_MODIFY_PAY_PW
} from "./actions.type";
import {
  SET_USERPAYPW,
  SET_AUTH,
  SET_ERROR,
  CLEAR_ERROR
} from "./mutations.type";
import ApiService from "@/service/api.service";

export const state = {
  isLogin: false,
  user: null,
  error: null,
  payPw: null
};

export const getters = {
  user(state) {
    return state.user;
  },
  error(state) {
    return state.error;
  },
  payPw(state) {
    return state.payPw;
  }
};

export const actions = {
  //登录
  [SIGN_IN]({
    commit
  }, credentials) {
    return new Promise(resolve => {
      ApiService.post("/user/login", credentials)
        .then(({
          data
        }) => {
          if (data.status === "OK") {
            console.log(data);
            const storeId = data.message.storeId
            const userInfo = Object.assign({}, data.message, {
              sign: data.params.sign
            });
            commit(SET_AUTH, userInfo, storeId);
            resolve(data);
          }
        })
        .catch(({
          data
        }) => {
          console.log(data)
          commit(SET_ERROR);
        });
    });
  },
  //账户信息
  [GET_STOREACCOUNTINFO]({
    commit,state
  }, credentials) {
      return new Promise(resolve => {
          ApiService.post("/district/getMyAccountInfo", credentials)
              .then(({data}) => {
                  if (data.status === "OK") {
                      const userInfo = state.user
                      userInfo.accountAmount =data.message.accountAmount
                      commit(SET_AUTH, userInfo);
                      console.log("getMyAccountInfo:",data);
                      resolve(data);
                  }
              })
              .catch(({data}) => {
                  console.log("getMyAccountInfo-Error",data)
                  commit(SET_ERROR);
           });
      })
  },
  //忘记密码
  [GET_CAPTCHA]({
    commit
  }, credentials) {
    ApiService.get('/public/getmsAuthCode', credentials).then(({
      data
    }) => {
      if (data.status === "OK") {
        console.log(data);
      }
    }).catch(({
      data
    }) => {
      console.log(data)
      commit(SET_ERROR);
    });
  },
  // 获取用户支付密码
  [GET_USERPAYPW]({
    commit
  }, credentials) {
    ApiService.post("/user/getUserPayPw", credentials)
      .then(({
        data
      }) => {
        if (data.status === "OK") {
          console.log("GET_USERPAYPW:",data);
        }
      })
      .catch(({
        data
      }) => {
        console.log(data)
        commit(SET_ERROR);
      });
  },
  // 设置用户支付密码
  [GET_PAY_PW]({commit},credentials){
    return ApiService.post('/user/saveUserPayPw',credentials).then(({data})=>{
      if(data.status=="OK"){
          const userInfo = Object.assign({}, data.message, {
              sign: data.params.sign
          });
          commit(SET_AUTH, userInfo);
      }
      return data
    })
  },
  //修改支付密码
  [GET_MODIFY_PAY_PW]({commit},credentials){
      return ApiService.post('/user/modifyWithdrawPassword',credentials).then(({data})=>{
          if(data.status=="OK"){
              // const userInfo = Object.assign({}, data.message, {
              //     sign: data.params.sign
              // });
              // commit(SET_AUTH, userInfo);
          }
          return data
      })
  },
};

export const mutations = {
  [SET_AUTH](state, user) {
    state.isLogin = true;
    state.user = user;
    localStorage.setItem("userInfo", JSON.stringify(user));
  },
  [SET_ERROR](state, error) {
      state.error = error.message;
      console.log(error)
  },
  [CLEAR_ERROR](state) {
    state.error = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
