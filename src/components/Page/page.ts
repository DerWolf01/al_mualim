import Card from "../Card/card_class";

export default class Page {
  constructor(title: string, items: Card[]) {
    this.title = title;
    this.items = items;
  }

  title: string;
  items: Card[];
}
