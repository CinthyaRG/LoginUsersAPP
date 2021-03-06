import Vue from 'vue'
import VueApollo from 'vue-apollo'
import apolloUploadClient from "apollo-upload-client"
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";

// Install the vue plugin
Vue.use(VueApollo)

const baseUrl = "http://localhost:3000/login";

const uploadClientLink = apolloUploadClient.createUploadLink({
  uri: baseUrl
});

const interceptor = setContext((request, previousContext) => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        authorization: token,
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
});

const apolloClient = new ApolloClient({
  link: interceptor.concat(uploadClientLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const instance = new VueApollo({
  defaultClient: apolloClient
});

export default instance;