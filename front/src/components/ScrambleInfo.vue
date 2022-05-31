<template>
  <div>
    <h1>Sorteio</h1>
    <div class="flex-row">
      <participants-table v-if="entries" :entries="entries"/>
      <h3 v-else>Sem participantes</h3>
      <template v-if="result">
        <h1>Resultado</h1>
        <result-table :result="result"/>
      </template>
      <div class="flex-col">
        <button v-if="!formOpened" @click="formOpened = !formOpened">Adicionar participante</button>
        <button v-if="!formOpened" @click="reset">Apagar sorteio atual</button>
        <button v-if="!formOpened && entries" @click="scramble">SORTEAR!</button>
      </div>
    </div>
    <form v-if="formOpened" style="margin-top: 100;">
      <input type="text" placeholder="Nome" v-model="form.name">
      <input type="text" placeholder="Localização X" v-model="form.location.x">
      <input type="text" placeholder="Localização Y" v-model="form.location.y">
      <div class="flex">
        <input type="button" @click="send" value="Confirmar">
        <input type="button" @click="cancel" value="Cancelar">
      </div>
    </form>
  </div>
</template>

<script>
import ParticipantsTable from './ParticipantsTable.vue'
import ResultTable from './ResultTable.vue'

export default {
  components: { ParticipantsTable, ResultTable },
  props: [
    'type'
  ],
  data() {
    return {
      entries: null,
      formOpened: false,
      result: null,
      form: {
        name: null,
        location: {
          x: null,
          y: null,
        }
      }
    }
  },
  methods: {
    send() {
      this.formOpened = !this.formOpened;

      fetch(this.apiUrl + '/add_entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.form),
      })
      .then( () => {
        this.load();
      })
      .catch(err => {
        console.error(err);
      });
    },
    cancel() {
      this.formOpened = !this.formOpened;

      this.form = {
        name: null,
        location: {
          x: null,
          y: null,
        }
      };
    },
    load() {
      fetch(this.apiUrl + '/scramble')
      .then(response => {
        response.json().then(data => {
          this.entries = data.entries;

          if( this.entries.length == 0) this.entries = null;
        });
      })
      .catch(err => {
        console.error(err);
      });
    },
    reset() {
      this.result = null;
      fetch(this.apiUrl + '/reset', {
        method: 'POST',
      })
      .then( () => {
        this.load();

        this.form = {
          name: null,
          location: {
            x: null,
            y: null,
          }
        };
      })
      .catch(err => {
        console.error(err);
      });
    },
    scramble() {
      fetch(this.apiUrl + '/scramble', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"type":this.type}),
      })
      .then(response => {
        response.json().then(data => {
          this.result = data.pairs;

          if( this.result.length == 0) this.result = null;
        });
      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  created() {
    this.load();
  },
  mounted() {

  }
}
</script>

<style>
.flex-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
}

.flex-col {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
}
</style>