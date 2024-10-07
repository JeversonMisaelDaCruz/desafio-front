<template>
  <div class="container">
    <div class="header">
      <h1>Leads</h1>
      <div class="button-group">
        <button @click="gokanban" class="kanban-button">Kanban</button>
        <button @click="openDialog" class="new-lead-button">Novo Lead</button>
      </div>
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
            <button @click="editLead(lead)" class="edit-button">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="dialog" class="dialog">
      <div class="dialog-content">
        <h2>{{ formTitle }}</h2>
        <form @submit.prevent="saveLead">
          <input v-model="editedLead.name" type="text" placeholder="Nome" class="input-field" required />
          <input v-model="editedLead.email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="editedLead.phone" type="tel" placeholder="Telefone" class="input-field" required />
          <select v-model="editedLead.status" class="input-field" required>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <div class="dialog-actions">
            <button type="button" @click="closeDialog" class="cancel-button">Cancelar</button>
            <button type="submit" class="save-button">Salvar</button>
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
          await apiClient.patch(`api/leads/${this.editedLead.id}`, this.editedLead);
        } else {
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
      this.editedLead = { ...item };
      this.dialog = true;
    },
    gokanban() {
      this.$router.push('/kanban');
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
.button-group {
  display: flex;
  gap: 20px; /* Aumenta o espaçamento entre os botões */
}
.kanban-button, .new-lead-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.kanban-button {
  background-color: #6c757d;
  color: white;
}
.new-lead-button {
  background-color: #007bff;
  color: white;
}
.kanban-button:hover, .new-lead-button:hover {
  opacity: 0.8;
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
  padding: 30px;
  border-radius: 8px;
  width: 400px;
}
.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.cancel-button {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.save-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-button:hover, .save-button:hover {
  opacity: 0.8;
}
</style>
