<template>
  <div class="container">
    <h5 class="text-center">Inicio de Sesión</h5>
    <div class="col-4 offset-md-4">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Introduzca su email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Contraseña"
          v-model="password"
        />
      </div>
      <div class="form-group" v-if="error != null">
        <p class="text-danger text-center">{{ error }}</p>
      </div>
      <div class="form-group">
        <button
          type="submit"
          class="btn btn-info form-control"
          @click="login()"
        >
          Entrar
        </button>
      </div>
      <div class="form-group">
        <p @click="$router.push({ name: 'register' })" class="text-center">
          Registrarse
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as querys from "../query.js";
import { parseGraphqlError } from "../util.js";

export default {
  name: "login",
  created() {},
  data() {
    return {
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    async login() {
      const loginObject = {
        email: this.email,
        password: this.password,
      };
      await this.$apollo
        .mutate({
          mutation: querys.LOGIN_QUERY,
          variables: { input: loginObject },
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
            "Ha ocurrido un error! Intente nuevamente.";
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 70px;
}

p:hover {
  color: grey;
  cursor: pointer;
}
</style>
