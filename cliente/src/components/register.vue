<template>
  <div class="container">
    <h5 class="text-center">Crear una cuenta</h5>
    <div class="col-4 offset-md-4">
      <div class="form-group">
        <label for="firstname">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="firstname"
          v-model="firstname"
        />
      </div>
      <div class="form-group">
        <label for="lastname">Apellido</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          v-model="lastname"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <label for="file">Avatar</label>
        <input
          type="file"
          class="form-control"
          id="file"
          v-on:change="onFileChange($event)"
        />
      </div>
      <div class="form-group" v-if="error != null">
        <p class="text-danger text-center">{{ error }}</p>
      </div>
      <div class="form-group">
        <button
          type="submit"
          class="btn btn-primary form-control"
          @click="register()"
        >
          Crear Cuenta
        </button>
      </div>
      <div class="form-group">
        <p @click="$router.push({ name: 'login' })" class="text-center">
          Regresar
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as querys from "../query";
import { parseGraphqlError } from "../util";

export default {
  name: "register",
  created() {},
  data() {
    return {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      image: null,
      error: null,
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.image = files[0];
    },
    async register() {
      var image = this.image;
      const registerObject = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        image: image,
      };

      await this.$apollo
        .mutate({
          mutation: querys.REGISTER_QUERY,
          variables: { input: registerObject },
        })
        .then(({ data }) => {
          const { token } = data.user;
          const { errors } = data.user;
          localStorage.setItem("token", token);
          localStorage.setItem("email", this.email);
          if (token) {
            this.$router.push({ name: "success" });
          } else {
            console.log(errors);
            this.error = errors[0] || "Ha ocurrido un error.";
          }
        })
        .catch((err) => {
          console.log(err);
          this.error =
            parseGraphqlError(err) ||
            "Ha ocurrido un error. Intente nuevamente";
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}

p:hover {
  color: grey;
  cursor: pointer;
}
</style>
