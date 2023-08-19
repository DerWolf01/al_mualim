import Card from "../components/Card/card_class";
import { InputCardConf } from "../components/Cards/input_card/input_card";

export type Items = Array<Card | InputCardConf>;
export default interface IPage {
  title: string;
  items: Items;

  setItems(): void;
}

type OnSubmit = (data: any) => Promise<void>;