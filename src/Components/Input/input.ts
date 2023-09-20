import { Block } from "../../core";
import { IProps } from "../../core/Block";



interface IInpurtProps extends IProps {
  inputClassName?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  name?: string;
  value?: unknown;
  onBlur?: () => void;
}

export class Input extends Block {
  constructor(props: IInpurtProps) {
    super(props);
    this.props.events = {
      blur: this.props.onBlur ?? (() => { })
    }
  }

  protected render() {
    const {
      inputClassName,
      placeholder,
      type,
      disabled,
      name,
      value
    } = this.props;
    return `
      <input
        ${inputClassName ? `class=${inputClassName}` : ''}
        ${placeholder ? `placeholder=${placeholder}` : ''}
        ${type ? `type=${type}` : ''}
        ${disabled ? `disabled=${disabled}` : ''}
        ${name ? `name=${name}` : ''}
        ${value ? `value=${value}` : ''}
        ref="input"
      />`
  }
}
