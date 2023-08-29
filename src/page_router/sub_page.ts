import { PageOption } from "../components/Page/option/page_option";
import { Page } from "./page";
import { Items } from "./types";

export abstract class SubPage extends Page {
  constructor(title: string, items: Items, options: PageOption[] = []) {
    super(title, items, options);
  }
}
