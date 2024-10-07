// src/plugins/vuetify.js
import 'vuetify/dist/vuetify.min.css'; // Importa o CSS do Vuetify
import { createVuetify } from 'vuetify'; 
import 'vuetify/styles';// Importa a função correta para Vue 3

// Cria e exporta uma instância do Vuetify
const vuetify = createVuetify({
  // Configurações adicionais (se necessário)
});

export default vuetify;
