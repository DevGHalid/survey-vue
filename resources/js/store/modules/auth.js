import axios from "axios";
import {
  saveUserDataToLocalStorage,
  removeUserDataFromLocalStorage,
  getUserDataFromLocalStorage,
  checkAuthenticated
} from "../../helpers/authHelper";

const user = getUserDataFromLocalStorage();

const state = {
  userId: user.userId,
  username: user.name,
  accessToken: user.accessToken,
  status: ""
};

const mutations = {
  loginRequest(state) {
    state.status = "loading";
  },

  loginSuccess(state, user) {
    state.userId = user.userId;
    state.username = user.name;
    state.accessToken = user.accessToken;

    state.status = "success";
  },

  loginError(state) {
    state.status = "error";
  },

  logout(state) {
    state.accessToken = "";
    state.userId = "";
    state.username = "";

    state.status = "";
  }
};

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("loginRequest");

      axios
        .post(`${BASE_URL}/api/auth/login`, user)
        .then(response => {
          const user = response.data;

          saveUserDataToLocalStorage(user);

          const bearer = `Bearer ${user.accessToken}`;

          axios.defaults.headers.common["Authorization"] = bearer;

          commit("loginSuccess", user);

          resolve(user);
        })
        .catch(error => {
          commit("loginError");

          reject(error);
        });
    });
  },

  logout({ commit }) {
    return axios
      .post(`${BASE_URL}/api/auth/logout`)
      .then(response => {
        commit("logout");
        // remove user from localStorage
        removeUserDataFromLocalStorage();

        delete axios.defaults.headers.common["Authorization"];
      })
      .catch(error => error);
  }
};

const getters = {
  username: state => state.username,
  authStatus: state => state.status,
  isAuthenticated: state => checkAuthenticated(state)
};

export default {
  state,
  mutations,
  actions,
  getters
};
