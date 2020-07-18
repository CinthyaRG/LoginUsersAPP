<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="col-12"></div>
      <button type="button" class="btn btn-info" href @click="logout()">
        <i class="lnr lnr-exit"></i>
        <span>Logout</span>
      </button>
    </nav>
    <div class="row">
      <div class="col-md-4" style="width: 20rem;">
        <img
          class="card-img-top"
          :src="user.image || defaulIcon"
          alt="Card image cap"
          align="right"
          borde
        />
      </div>
      <div class="col-md-6">
        <h2 class="text-welcome">
          Hola {{ user.firstname }} {{ user.lastname }}!
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import * as query from "../query";
import defaultImage from "../assets/default-image.jpeg";

export default {
  name: "sucess",
  data() {
    return {
      user: {
        firstname: null,
        lastname: null,
        image: null,
      },
      defaulIcon: defaultImage,
    };
  },
  apollo: {
    user: query.GET_USER_QUERY,
  },
  created() {
    this.$apollo.queries.user.refetch();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style scoped>
#container {
  margin: 20px;
}

img {
  border: 3px solid #1dada8;
}

#text-welcome {
  margin-top: 20px;
}
</style>
