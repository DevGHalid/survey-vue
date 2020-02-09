<template>
  <div class="page">
    <PortalTarget name="modal-portal" />
    <div class="page-main">
      <RouterView />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { removeUserDataFromLocalStorage } from "../helpers/authHelper";

export default {
  methods: {
    ...mapMutations(["logout"])
  },

  created() {
    axios.interceptors.response.use(null, error => {
      // if does not match the token
      if (error.response.status === 401) {
        this.logout();
        // remove user from localStorage
        removeUserDataFromLocalStorage();

        delete this.$http.defaults.headers.common["Authorization"];

        this.$router.push("/login");
      }

      throw error;
    });
  }
};
</script>
