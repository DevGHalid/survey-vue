import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import form from "./modules/form";
import formSheet from "./modules/formSheet";
import typeQuestion from "./modules/typeQuestion";

Vue.use(Vuex);

const store = new Vuex.Store({
  // mode
  strict: process.env.NODE_ENV !== "production",

  modules: {
    auth,
    form,
    formSheet,
    typeQuestion
  }
});

export default store;
