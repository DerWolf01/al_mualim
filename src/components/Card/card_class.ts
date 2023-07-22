export default class Card {
  constructor(conf: {
    title: string;
    content: string;
    icon?: boolean;
    img?: boolean;
  }) {
    const { title, content, icon, img } = conf;
    this.title = title;
    this.content = content;
    this.icon = icon ?? false;
    this.img = img ?? false;
  }
  title: string;
  icon: boolean = false;
  img: boolean = false;
  content: string;
}
