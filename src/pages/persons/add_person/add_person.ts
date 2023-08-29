import { InputCardConf } from "../../../components/Cards/input_card/input_card";
import StudentCard from "../../../components/Cards/student_card";
import { Icon } from "../../../components/Icons/types";
import { PageOption } from "../../../components/Page/option/page_option";
import { PopUp, PopUpOption } from "../../../components/PopUp/pop_up";
import { Notification } from "../../../controller/notification/notification";
import { NotificationController } from "../../../controller/notification/notification_controller";
import {
  CourseRequestController,
  RequestController,
} from "../../../controller/request_controller/request_controller";
import { CourseModel } from "../../../models/course/course_model";
import { PersonModel } from "../../../models/person_model/person_model";
import { IPerson, Roles } from "../../../models/person_model/types";
import { Page } from "../../../page_router/page";
import { PageRouter } from "../../../page_router/page_router";
import { SubPage } from "../../../page_router/sub_page";
import { Items } from "../../../page_router/types";
import { FormPage } from "../../form_page/page";

export class CreatePersonPage extends FormPage {
  private constructor(
    items: Items,
    role: Roles.STUDENT_ROLE | Roles.TEACHER_ROLE
  ) {
    super(
      `${role == Roles.STUDENT_ROLE ? "Schüler" : "Lehrer"} erstellen`,
      items,
      [],
      async () => {
        console.log(this.getValuesobject());
      }
    );
  }

  private static inst: CreatePersonPage;

  static async init(
    role?: Roles.STUDENT_ROLE | Roles.TEACHER_ROLE
  ): Promise<CreatePersonPage> {
    var items = await this.getItems();

    this.inst = new CreatePersonPage(items, role ?? Roles.STUDENT_ROLE);
    return this.inst;
  }

  options: PageOption[] = [];

  static items: Items = {
    none: [
      new InputCardConf({
        index: 1,
        max: 35,
        min: 5,
        required: true,
        title: "Vorname",
        placeholder: "Ahmed, Mustafa, Yusuf...",
        data_describer: "name",
        onError: (e) => {
          console.log(e);
        },
      }),
      new InputCardConf({
        index: 1,
        max: 35,
        min: 5,
        required: true,
        title: "Nachname",
        placeholder: "Demirci, Usta, Kelebek",
        data_describer: "last_name",
        onError: (e) => {
          console.log(e);
        },
      }),
      new InputCardConf({
        index: 1,
        max: 320,
        min: 5,
        type: "text",
        required: true,
        title: "Nutzername",
        placeholder: "bdemir, ali123, yozgatli7...",
        data_describer: "username",
        onError: (e) => {
          console.log(e);
        },
      }),
      new InputCardConf({
        index: 1,
        max: 320,
        min: 5,
        type: "text",
        required: true,
        title: "Email Adresse",
        placeholder: "max@mubarek.de",
        data_describer: "email",
        onError: (e) => {
          console.log(e);
        },
      }),
      new InputCardConf({
        index: 1,
        max: 320,
        min: 5,
        type: "email",
        required: true,
        title: "Email Adresse",
        placeholder: "max@mubarek.de",
        data_describer: "email",
        onError: (e) => {
          console.log(e);
        },
      }),
      new InputCardConf({
        index: 2,
        required: true,
        min: 7,
        max: 25,
        type: "password",
        title: "Password",
        placeholder: "Aci biber, 1234567...",
        data_describer: "password",
      }),
    ],
  };

  static options = [
    new PageOption("add", {
      action: async () => {
        this.inst.submitForm();
      },
    }),
  ];
  getOptions(): PageOption[] {
    return CreatePersonPage.options;
  }
  static getOptions(): PageOption[] {
    return this.options;
  }
  async getItems(): Promise<Items> {
    return this.items;
  }
  static async getItems(): Promise<Items> {
    return this.items;
  }
  async setItems(): Promise<void> {
    this.items = await CreatePersonPage.getItems();
    return;
  }
}

//@ts-ignore
export class AddPersonPage extends SubPage {
  private constructor(
    items: Items,
    addTo: CourseModel,
    options?: PageOption[]
  ) {
    super("Add Person", items, options);
    this.addTo = addTo;
  }

  private static instance: AddPersonPage;

  static async init(addTo: CourseModel): Promise<AddPersonPage> {
    const items = await this.getItems();
    console.log(items);
    this.instance = new AddPersonPage(items, addTo, [
      new PageOption("add", {
        action: async (_, p) => {
          await p.popUp?.change();
        },
        popUp: new PopUp(
          [
            new PopUpOption(
              "Schüler hinzufügen",
              new Icon("personAdd"),
              async () => {
                PageRouter.getInstance?.createPersonPage(Roles.STUDENT_ROLE);
              }
            ),
            new PopUpOption(
              "Lehrer hinzufügen",
              new Icon("personAdd"),
              async () => {
                PageRouter.getInstance?.createPersonPage(Roles.TEACHER_ROLE);
              }
            ),
          ],
          "addPerson"
        ),
      }),
    ]);

    return this.instance;
  }

  addTo: CourseModel;
  static getInstance() {
    return this.instance;
  }
  options = [
    new PageOption("add", {
      action: async (_, p) => {
        await p.popUp?.change();
      },
      popUp: new PopUp(
        [
          new PopUpOption(
            "Schüler hinzufügen",
            new Icon("personAdd"),
            async () => {
              PageRouter.getInstance?.createPersonPage(Roles.STUDENT_ROLE);
            }
          ),
          new PopUpOption(
            "Lehrer hinzufügen",
            new Icon("personAdd"),
            async () => {
              PageRouter.getInstance?.createPersonPage(Roles.TEACHER_ROLE);
            }
          ),
        ],
        "addPerson"
      ),
    }),
  ];
  getOptions(): PageOption[] {
    return this.options;
  }

  async cardInteraction(p: PersonModel) {
    const res = await CourseRequestController.addPersonToCourse(
      p.id,
      this.addTo.id
    );
  }
  static async cardInteraction(p: PersonModel) {
    const res = await CourseRequestController.addPersonToCourse(
      p.id,
      this.getInstance().addTo.id
    );
    console.log("Add Person fetch result", res);
    if (res?.status == 200) {
      NotificationController.add(
        new Notification("Erfolgreich hinzugefügt", "success")
      );
      await PageRouter.getInstance?.backward();
      return;
    }
    if (res?.status == 303) {
      NotificationController.add(
        new Notification("Nimmt bereits teil", "warning")
      );
      return;
    }

    console.log(res?.status);
  }

  static getOptions(): PageOption[] {
    return [
      new PageOption("add", {
        action: async (_, p) => {
          await p.popUp?.change();
        },
        popUp: new PopUp(
          [
            new PopUpOption(
              "Schüler hinzufügen",
              new Icon("personAdd"),
              async () => {
                PageRouter.getInstance?.createPersonPage(Roles.STUDENT_ROLE);
              }
            ),
            new PopUpOption(
              "Lehrer hinzufügen",
              new Icon("personAdd"),
              async () => {
                PageRouter.getInstance?.createPersonPage(Roles.TEACHER_ROLE);
              }
            ),
          ],
          "addPerson"
        ),
      }),
    ];
  }
  async getItems(): Promise<Items> {
    const res: Items = {
      Lehrer: [],
      Schüler: [],
    };
    const persons = await RequestController.personsFromServer();
    console.log(persons);
    for (let p of persons) {
      if (p.role == Roles.STUDENT_ROLE) {
        console.log("Schüler", p);
        res.Schüler.push(
          new StudentCard(p, async () => await this.cardInteraction(p))
        );
        continue;
      }
      console.log("Lehrer", p);
      res.Lehrer.push(
        new StudentCard(p, async () => await this.cardInteraction(p))
      );
    }
    return res;
  }

  static async getItems(): Promise<Items> {
    const res: Items = {
      Lehrer: [],
      Schüler: [],
    };
    const persons = await RequestController.personsFromServer();
    console.log(persons);
    for (let p of persons) {
      if (p.role == Roles.STUDENT_ROLE) {
        console.log("Schüler", p);

        res.Schüler.push(
          new StudentCard(p, async () => await this.cardInteraction(p))
        );

        continue;
      }
      console.log("Lehrer", p);
      res.Lehrer.push(
        new StudentCard(p, async () => await this.cardInteraction(p))
      );
    }
    return res;
  }
}
