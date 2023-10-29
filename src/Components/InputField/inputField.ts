import Block from "../../core/Block";
import { IProps } from "../../types/IProps";



interface IInputFieldProps  {
  inputContainerClassName?: string;
  inputLabelClassName?: string;
  inputClassName?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  name?: string;
  value?: unknown;
  validate?: (value: string) => string;
}
export class InputField extends Block<IInputFieldProps> {
  constructor(props: IProps<IInputFieldProps>) {
    super({
      ...props,
      onBlur: () => this.validate()
    });
  }

  public value() {
    if (!this.validate()) {
      return "";
    }
    const inputElement = this.refs?.input?.element as HTMLInputElement;
    return inputElement?.value;
  }

  private validate() {
    const refs = this.refs;
    const inputElement = refs?.input?.element as HTMLInputElement;
    const value = inputElement?.value;
    const error = this.props.validate?.(value);
    if (error) {
      refs.errorLine?.setProps?.({ error });
      return false;
    }
    refs?.errorLine?.setProps?.({ error: undefined });
    return true;
  }



  protected render() {
    const {
      inputContainerClassName,
      inputLabelClassName,
      label,
      inputClassName,
      placeholder,
      type,
      disabled,
      name,
      value
    } = this.props;


    return `
    <div ${inputContainerClassName ? `class=${inputContainerClassName}` : ''}>
      <div class="input-wrapper">
        ${label ? `<label ${inputLabelClassName ? `class=${inputLabelClassName}` : ''}>${label ?? ''}</label>` : ""}
        {{{ Input
            ref="input"
            onBlur=onBlur
            inputClassName="${inputClassName ?? ""}"
            placeholder="${placeholder ?? ""}"
            type="${type ?? ""}"
            name="${name ?? ""}"
            value="${value ?? ""}"
            disabled="${disabled ?? ""}"
          }}}
      </div>
      {{{ ErrorLine ref="errorLine"}}}
    </div>
  `;
  }
}
