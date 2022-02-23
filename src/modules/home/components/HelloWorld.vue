<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="content">
      <p>
        Bem vindo ao desafio de Vue.js + Typescript da tribo Accelereate.<br>
        O desafio será implementar uma tela de lista de transações apresentando os principais dados relacionados a cada uma delas, ao clicar em uma transação será exibido um modal contendo os detalhes desta transação. O desafio deverá conter as seguintes funcionalidades:
        <ul>
          <li>Lista de transações agrupada por data</li>
          <li>Filtro por título</li>
          <li>Filtro por status</li>
          <li>Modal contendo os detalhes da transação</li>
        </ul>
      </p>
      <p>
        É obrigatório e será avaliado o uso de:
        <ul>
          <li>Vue com Typescript</li>
          <li>Axios</li>
          <li>Vue Class Components</li>
          <li>Vue property decorator</li>
          <li>Vuex</li>
          <li>Testes</li>
          <li>CI</li>
        </ul>
      </p>      
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.container {
  width: 100vw;  
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  max-width: 50vw;
  text-align: left;
}
</style>
