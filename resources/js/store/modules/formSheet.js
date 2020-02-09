import axios from "axios";

const state = {
  items: [],
  status: ""
};

const mutations = {
  setSheetStatusRequest: state => {
    state.status = "loading";
  },

  setSheetStatusSuccess: state => {
    state.status = "success";
  },

  setSheetStatusError: state => {
    state.status = "error";
  },

  setSheet: (state, sheet) => {
    state.items = sheet;
  },

  addSheet: (state, sheet) => {
    state.items.push(sheet)
  }
};

const actions = {
  loadSheetsByFormId: ({ commit }, formId) => {
    return new Promise((resolve, reject) => {
      commit("setSheetStatusRequest");

      axios
        .get(`${BASE_URL}/api/forms/${formId}/sheets`)
        .then(response => {
          commit("setSheet", response.data.sheets || []);
          commit("setSheetStatusSuccess");

          resolve(response);
        })
        .catch(error => {
          reject(error);

          commit("setSheetStatusError");
        });
    });
  },

  saveSheet: ({ commit }, sheet) => {
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api/sheets/create`, sheet)
        .then(response => {
          commit('addSheet', response.data.sheet || {});

          resolve(response);
        }).catch(error => {
          reject(error);

          commit('setSheetStatusError');
        });
    });
  }
};

const getters = {
  allSheets: state => state.items,
  countSheets: state => state.items.length,
  sheetStatus: state => state.status
};

export default {
  state,
  mutations,
  actions,
  getters
};
