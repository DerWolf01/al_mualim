export default class Card {
  constructor(conf: {
    title: string;
    content?: string;
    icon?: boolean;
    img?: boolean;
    classNames?: string;
    delay?: number;
  }) {
    const { title, content, icon, img, classNames, delay } = conf;
    this.title = title;
    this.content = content;
    this.icon = icon ?? false;
    this.img = img ?? false;
    this.classNames = classNames;
    this.delay = delay ?? 0;
  }
  title: string;
  icon: boolean = false;
  img: boolean = false;
  content?: string;
  classNames?: string;
  delay: number = 0;

  setDelay(delay: number): void {
    this.delay = delay;
  }
}
