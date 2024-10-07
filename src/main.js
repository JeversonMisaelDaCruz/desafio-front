// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o roteador
import store from './store'; // Importa a store do Vuex
import vuetify from './plugins/vuetify'; // Importa o Vuetify que criamos

// Cria a instância do aplicativo Vue
createApp(App)
  .use(router)  // Usa o roteador
  .use(store)   // Usa o Vuex para gerenciamento de estado
  .use(vuetify) // Usa o Vuetify como plugin
  .mount('#app'); // Monta o aplicativo no elemento DOM com id 'app'
