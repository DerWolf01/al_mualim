import { defineStore } from "pinia";
import { PageRouter, routes } from "../page_router/page_router";
import Card from "../components/Card/card_class";
import { Items } from "../components/Page/page";

export const usePageRouterStore = defineStore({
  id: "page_router",
  state: () => ({
    router: PageRouter.instance,
    items: [] as Items,
  }),
  getters: {
    getTitle(): string {
      return this.router.getPageTitle();
    },
    getItems(state) {
      return state.items;
    },
    async setItems() {
      this.items = await this.router.getItems();
    },
  },
  actions: {
    async to(page: routes): Promise<Items> {
      this.items = await this.router.to(page);
      return this.items;
    },
    async init(name: routes): Promise<void> {
      this.router = await PageRouter.init(name);

    },
  },
});
