<!-- src/views/LeadsView.vue -->
<template>
  <div class="container">
    <div class="header">
      <h1>Leads</h1>
      <button @click="openDialog">Novo Lead</button>
    </div>

    <div class="search">
      <input v-model="search" placeholder="Pesquisar" />
    </div>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in filteredLeads" :key="lead.id">
          <td>{{ lead.name }}</td>
          <td>{{ lead.email }}</td>
          <td>{{ lead.phone }}</td>
          <td>{{ lead.status }}</td>
          <td>
            <button @click="editLead(lead)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Dialog para criar/editar lead -->
    <div v-if="dialog" class="dialog">
      <div class="dialog-content">
        <h2>{{ formTitle }}</h2>
        <form @submit.prevent="saveLead">
          <input v-model="editedLead.name" type="text" placeholder="Nome" required />
          <input v-model="editedLead.email" type="email" placeholder="Email" required />
          <input v-model="editedLead.phone" type="tel" placeholder="Telefone" required />
          <select v-model="editedLead.status" required>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <div class="dialog-actions">
            <button type="button" @click="closeDialog">Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../plugins/axios';

export default {
  name: 'LeadsView',
  data() {
    return {
      search: '',
      leads: [],
      dialog: false,
      editedLead: {
        id: null,
        name: '',
        email: '',
        phone: '',
        status: '',
      },
      statuses: ['novo', 'em_contato', 'qualificado', 'perdido'],
    };
  },
  computed: {
    formTitle() {
      return this.editedLead.id ? 'Editar Lead' : 'Novo Lead';
    },
    filteredLeads() {
      return this.leads.filter((lead) =>
        lead.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  created() {
    this.fetchLeads();
  },
  methods: {
    async fetchLeads() {
      try {
        const response = await apiClient.get('api/leads');
        this.leads = response.data;
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar leads');
      }
    },
    openDialog() {
      this.editedLead = {
        id: null,
        name: '',
        email: '',
        phone: '',
        status: '',
      };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async saveLead() {
      try {
        if (this.editedLead.id) {
          // Atualizar lead existente
          await apiClient.patch(`api/leads/${this.editedLead.id}`, this.editedLead);
        } else {
          // Criar novo lead sem o campo id
          await apiClient.post('api/leads', this.editedLead);
        }
        this.fetchLeads();
        this.closeDialog();
      } catch (error) {
        console.error(error);
        alert('Erro ao salvar lead');
      }
    },
    editLead(item) {
      this.editedLead = { ...item }; // Copiar o lead para edição
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search {
  margin: 10px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
