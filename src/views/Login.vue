<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <!-- Campo Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Digite seu email"
          required
        />
      </div>

      <!-- Campo Senha -->
      <div class="form-group">
        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Digite sua senha"
          required
        />
      </div>

      <!-- Botão de Login -->
      <button type="submit" class="btn">Entrar</button>
    </form>
  </div>
</template>

<script>
import apiClient from '../plugins/axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (this.email && this.password) {
        try {
          // Requisição ao backend para autenticar o usuário
          const response = await apiClient.post('api/auth/login', {
            email: this.email,
            password: this.password,
          });
          const token = response.data.access_token;
          // Armazenando o token no Vuex (ou localStorage)
          this.$store.commit('auth/SET_TOKEN', token);
          // Redireciona para a página do Kanban
          this.$router.push('/kanban');
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          alert('Credenciais inválidas');
        }
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    },
  },
};
</script>

<style scoped>
/* Estilo simples para a página de login */
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
