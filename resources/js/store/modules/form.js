import axios from "axios";

const state = {
  items: [],
  status: ""
};

const mutations = {
  setFormStatusRequest: state => {
    state.status = "loading";
  },

  setFormStatusSuccess: state => {
    state.status = "success";
  },

  setFormStatusError: state => {
    state.status = "error";
  },

  setForm: (state, formItems) => {
    state.items = formItems;
  },

  addForm: (state, formItem) => {
    state.items.push(formItem);
  },

  removeForm: (state, id) => {
    state.items = state.items.filter(item => item.id !== id);
  }
};

const actions = {
  loadAllForms: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit("setFormStatusRequest");

      axios
        .get(`${BASE_URL}/api/forms`)
        .then(response => {
          commit("setForm", response.data.formItems);

          resolve(response);
        })
        .catch(error => {
          commit("setFormStatusError");

          reject(error);
        });
    });
  },

  saveForm: ({ commit }, formName) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/api/forms/create`, { name: formName })
        .then(response => {
          commit("addForm", response.data.formItem);

          resolve(response);
        })
        .catch(error => {
          commit("setFormStatusError");

          reject(error);
        });
    });
  },

  removeForm: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}/api/forms/${id}/delete`)
        .then(response => {
          if (response.data.success) {
            commit("removeForm", id);
            resolve(response);
          }
        })
        .catch(error => {
          commit("setFormStatusError");

          reject(error);
        });
    });
  }
};

const getters = {
  allForms: state => state.items,
  formStatus: state => state.status
};

export default {
  state,
  mutations,
  actions,
  getters
};
