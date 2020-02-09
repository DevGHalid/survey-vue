import Vue from "vue";
import axios from "axios";
import store from "./store/index";
import router from "./router/index";

import App from "./components/App";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTrashAlt,
  faPencilAlt,
  faTimes,
  faTimesCircle,
  faSave,
  faEye,
  faCopy
} from "@fortawesome/free-solid-svg-icons";

// add icons
library.add(faPlus);
library.add(faTimes);
library.add(faTimesCircle);
library.add(faTrashAlt);
library.add(faPencilAlt);
library.add(faEye);
library.add(faSave);
library.add(faCopy);

// global components
Vue.component("FontAwesomeIcon", require('@fortawesome/vue-fontawesome').FontAwesomeIcon);
Vue.component("Master", require( "./layouts/Master").default);

// connect libraries
Vue.use(require('portal-vue').default);

// app
const app = new Vue({
  el: "#app",
  store,
  router,

  render: h => h(App),

  created() {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
});
