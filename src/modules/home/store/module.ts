import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";

@Module({ namespaced: true, name: "HomeModule" })
export class HomeStoreModule extends VuexModule {
  // states, getters, mutations, actions
  //exemplo state
  public home = "home";

  //exemplo getter
  public get homeValue(): string {
    return this.home;
  }

  //exemplo mutation
  @Mutation
  changeValue(value: string) {
    this.home = value;
  }

  //exemplo action
  @Action
  fetchValue() {
    //alguma validação de regra de negócio ou integração com api.
  }
}
