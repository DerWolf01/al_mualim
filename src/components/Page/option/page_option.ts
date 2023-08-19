import * as icons from "ionicons/icons";
export class PageOption {
  constructor(
    icon: keyof typeof icons,
    conf?: { title?: string; action?: (e: PointerEvent) => void }
  ) {
    this.icon = icons[icon];
    this.title = conf?.title;
    this.action = conf?.action ?? ((e) => {});
  }

  icon: string;
  title?: string;
  action: (e: PointerEvent) => void;
}
