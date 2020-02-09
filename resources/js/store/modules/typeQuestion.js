import axios from "axios";

const state = {
  items: [],
  status: ""
};

const mutations = {
  setTypeQuestionStatusRequest: state => {
    state.status = "loading";
  },

  setTypeQuestionStatusSuccess: state => {
    state.status = "success";
  },

  setTypeQuestionStatusError: state => {
    state.status = "error";
  },

  setTypeQuestion: (state, questions) => {
    state.items = questions;
  }
};

const actions = {
  loadAllTypeQuestions: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit("setTypeQuestionStatusRequest");

      axios
        .get(`${BASE_URL}/api/type-questions`)
        .then(response => {
          commit("setTypeQuestion", response.data.questions || []);
          commit("setTypeQuestionStatusSuccess");
          resolve(response);
        })
        .catch(error => {
          commit("setTypeQuestionStatusError");
          reject(error);
        });
    });
  }
};

const getters = {
  allTypeQuestions: state => state.items,
  typeQuestionStatus: state => state.status
};

export default {
  state,
  mutations,
  actions,
  getters
};
