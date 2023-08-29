import * as i from "ionicons/icons";

export type icons = keyof typeof i;

export class Icon extends String {
  constructor(icon: icons) {
    super(i[icon]);
    this.icon = icon;
  }
  icon: icons;
}
