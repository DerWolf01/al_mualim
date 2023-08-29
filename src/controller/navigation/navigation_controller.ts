import { Controller } from "..";

type icons = "stairs" | "back";
export class NavigationController extends Controller {
  static icon: icons = "stairs";
  static listeners: Array<(icon: icons) => void> = [];
  static _onIconChange() {
    for (let listener of this.listeners) {
      listener(this.icon);
    }
  }

  static addListener(callback: (icon: icons) => void) {
    this.listeners.push(callback);
  }
  static stairsIcon() {
    this.icon = "stairs";
    this._onIconChange();
  }
  static backIcon() {
    this.icon = "back";
    this._onIconChange();
  }
}
