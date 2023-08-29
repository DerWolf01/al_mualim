import Card from "../components/Card/card_class";
import { InputCardConf } from "../components/Cards/input_card/input_card";
import { Page } from "./page";

export type Items = { [key: string]: Array<Card | InputCardConf> };
export default interface IPage {
  title: string;
  items: Items;

  setItems(): void;
}

type OnSubmit = (data: any) => Promise<void>;

export type PageRouterEvents = "beforeChange" | "afterChange";
export type PageRouterEventCallback = (page: Page) => Promise<void>;
export type routes =
  | "SchülerListe"
  | "CreatePersonPage"
  | "AddPersonPage"
  | "Login"
  | "Courses"
  | "AddCoursePage";
