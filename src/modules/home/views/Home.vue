<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/warren-logo.png" />
    <HelloWorld msg="Accelereate Transactions Vue.js Challenge!" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/modules/home/components/HelloWorld.vue";

//Exemplo 1 de uso do store
import { namespace } from "vuex-class";
const HomeStoreModule = namespace("HomeModule");

//Exemplo 2 do uso do store
import { HomeModule } from "@/modules/home/store";

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  //Exemplo 1 de uso do store
  @HomeStoreModule.Getter("homeValue") private homeValue!: string;

  //Exemplo 2 do uso do store
  private get getHomeValue() {
    return HomeModule.homeValue;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
