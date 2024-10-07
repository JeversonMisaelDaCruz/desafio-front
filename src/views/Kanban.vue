<template>
  <div class="kanban-container">
    <div class="kanban-columns">
      <div v-for="(column, index) in columns" :key="index" class="kanban-column">
        <h3>{{ column.name }}</h3>
        <draggable
          v-model="column.leads"
          class="kanban-leads"
          group="leads"
          @end="onDragEnd"
        >
          <!-- Renderizando os cards dos leads -->
          <template #item="{ element }">
            <div :key="element.id" class="kanban-card">
              <h4>{{ element.name }}</h4>
              <p>Email: {{ element.email }}</p>
              <p>Telefone: {{ element.phone }}</p>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import apiClient from '../plugins/axios';

export default {
  name: 'KanbanBoard',
  components: {
    draggable,
  },
  data() {
    return {
      columns: [
        { name: 'Novo', status: 'novo', leads: [] },
        { name: 'Em Contato', status: 'em_contato', leads: [] },
        { name: 'Qualificado', status: 'qualificado', leads: [] },
        { name: 'Perdido', status: 'perdido', leads: [] },
      ],
    };
  },
  created() {
    this.fetchLeads();
  },
  methods: {
    async fetchLeads() {
      try {
        const response = await apiClient.get('/api/leads');
        const leads = response.data;

        // Filtra os leads de acordo com o status e atribui a cada coluna
        this.columns.forEach((column) => {
          column.leads = leads.filter((lead) => lead.status === column.status);
        });
      } catch (error) {
        console.error('Erro ao buscar leads:', error);
        alert('Erro ao buscar leads');
      }
    },
    async onDragEnd(event) {
      const lead = event.item; // O item é o lead
      const newStatus = this.columns[event.to.dataset.index].status;

      try {
        await apiClient.patch(`/api/leads/${lead.id}`, { status: newStatus });
        this.fetchLeads(); // Atualiza os leads após o arraste
      } catch (error) {
        console.error('Erro ao atualizar lead:', error);
        alert('Erro ao atualizar lead');
      }
    },
  },
};
</script>

<style scoped>
.kanban-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.kanban-columns {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.kanban-column {
  flex: 1;
  background-color: #f0f0f0;
  margin: 0 10px;
  padding: 20px;
  border-radius: 8px;
}

.kanban-leads {
  min-height: 200px;
}

.kanban-card {
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.kanban-card:hover {
  transform: scale(1.02);
}

.kanban-card h4 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
}

.kanban-card p {
  margin: 0;
}
</style>
