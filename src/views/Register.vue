<template>
  <div class="register-container">
    <h1>Registrar-se</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Nome</label>
        <input
          type="text"
          v-model="name"
          id="name"
          required
          placeholder="Digite seu nome"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          required
          placeholder="Digite seu email"
        />
      </div>

      <div class="form-group">
        <label for="password">Senha</label>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          placeholder="Digite sua senha"
        />
      </div>

      <button type="submit" class="btn">Registrar</button>

      <button type="button" class="btn-secondary" @click="goToLogin">
        Já tenho conta
      </button>
    </form>
  </div>
</template>

<script>
import apiClient from '../plugins/axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      console.log('Tentando registrar...');
      try {
        await apiClient.post('api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        alert('Usuário registrado com sucesso!');
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro ao registrar:', error);
        alert('Erro ao registrar. Tente novamente.');
      }
    },
    goToLogin() {
      console.log('Redirecionando para a página de login...');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register-container {
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
}

.btn-secondary {
  width: 100%;
  padding: 0.75rem;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
