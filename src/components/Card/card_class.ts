import { Icon } from "../Icons/types";

export default class Card {
  constructor(conf: ICard) {
    const { title, content, icon, img, classNames, delay, action } = conf;
    this.title = title;
    this.content = content;
    this.icon = icon;
    this.img = img;
    this.classNames = classNames;
    this.delay = delay ?? 0;
    this.action = action;
  }
  title: string;
  icon?: string | Icon;
  img?: string;
  content?: string;
  classNames?: string;
  delay: number = 0;
  action?;

  setDelay(delay: number): void {
    this.delay = delay;
  }
}

export interface ICard {
  title: string;
  content?: string;
  icon?: string | Icon;
  img?: string;
  classNames?: string;
  delay?: number;
  action?: (card: Card) => Promise<void>;
}
