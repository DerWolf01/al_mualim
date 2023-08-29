import anime from "animejs";
import { AlertController } from "../../Alert/alert_controller";
import Card from "../../Card/card_class";

enum InputErrors {
  noMinChars = "noMinChars",
  required = "required",
  emailInvalid = "emailInvalid",
}

export class InputError extends String {
  constructor(input: InputCardConf, error: InputErrors) {
    super(InputError[error](input));
  }
  static [key: string]: any;

  static required(input: InputCardConf): string {
    return `This field is required`;
  }
  static noMinChars(input: InputCardConf): string {
    return `Enter at least ${input.min} characters`;
  }
}

export class InputCardConf extends Card implements InputConfType {
  constructor(conf: InputConfType) {
    const {
      title,
      placeholder,
      data_describer,
      type,
      max,
      min,
      required,
      delay,
      classNames,
      onError,
      index,
      action,
    } = conf;
    super(conf);
    this.title = title;
    this.placeholder = placeholder;
    this.data_describer = data_describer;
    this.max = max;
    this.min = min ?? 0;
    this.required = required;
    this.classNames = classNames;
    this.id = `input-card-${this.title.replaceAll(" ", "")}-${Date.now()}`;
    this.type = type ?? "text";
    this.onError = onError;
    this.index = index;
    this.action = action;
  }
  title: string;
  placeholder: string;
  data_describer: string;
  max?: number;
  min: number = 0;
  required?: boolean;
  classNames?: string;
  id: string;
  errors: InputError[] = [];
  type: "text" | "password" | "email";
  onError?: (errors: InputError[]) => void;
  index?: number | undefined;
  /**
   * @function inputIsValid
   * @description Returns true if value is valid false if invalid.
   * @returns boolean
   */
  inputIsValid(): boolean {
    this.errors = [];
    if (!this.hasMinChars()) {
      this.errors.push(new InputError(this, InputErrors.noMinChars));
    }
    if (this.isRequiredButEmpty()) {
      this.errors.push(new InputError(this, InputErrors.required));
    }

    if (this.errors.length > 0) {
      if (this.onError) {
        this.onError(this.errors);
      }
      this.insertAlert();
      return false;
    }
    this.removeAlert();
    return true;
  }

  insertAlert() {
    AlertController.createAlert(this);
  }

  removeAlert() {
    AlertController.removeAlert(this);
  }

  isRequiredButEmpty(): boolean {
    return (this.required ?? false) && this.getInputValueLength() < 1;
  }
  hasMaxChars(): boolean {
    if (!this.max) {
      return false;
    }
    return this.getInputValueLength() >= this.max;
  }

  hasMinChars(): boolean {
    return this.getInputValueLength() >= this.min;
  }

  getInputValueLength(): number {
    return this.getInputValue()?.length ?? 0;
  }
  getInputValue(): string | undefined {
    return this.getInputEl()?.value;
  }
  getInputEl(): HTMLInputElement | null {
    return document.getElementById(this.id) as HTMLInputElement | null;
  }
}

type InputConfType = {
  title: string;
  placeholder: string;
  data_describer: string;
  type?: "text" | "password" | "email";
  max?: number;
  min?: number;
  required?: boolean;
  classNames?: string;
  delay?: number;
  id?: string;
  index?: number;
  onError?: (errors: InputError[]) => void;
  action?: (card: Card) => Promise<void>;
};

type InputCardEvents = "onSubmit" | "onError" | "input";
