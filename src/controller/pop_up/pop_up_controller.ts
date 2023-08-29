import { PopUp } from "../../components/PopUp/pop_up";

export class PopUpController {
  static activePopUp?: PopUp;

  static async setPopUp(p: PopUp) {
    await this.activePopUp?.deactivate();
    
    this.activePopUp = p;
    // p.activate();
  }
}
