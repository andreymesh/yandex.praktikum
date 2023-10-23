import { Block, IProps, modalController } from "../../core";
import { validateNameChat } from "../../utils";

interface IModalPromptProps {
  caption: string;
  labelText: string;
  okText: string;
  okClick?: (result: string) => void;
  okInputClick?: (event: Event) => void;
  cancelClick?: () => void;
  ref?: string;
  validate?: Record<string, (value: string) => string>;
}

export class ModalPrompt extends Block<IModalPromptProps> {
  constructor(props: IProps<IModalPromptProps>) {
    const newProps = {
      ...props,
      okInputClick: (event: Event) => {
        event.preventDefault();
        const input = this.refs.modal.getRefs().input.value();
        if (!input) {
          return;
        }
        this.props.okClick && this.props.okClick(input);
        modalController.closeModal();
      },
      cancelClick: () => {
        modalController.closeModal();
      },
      validate: {
        nameChat: (value: string) => validateNameChat(value) ? "Наименование чата не может быть пустым" : "",
      }
    }

    super(newProps);
  }

  getChildren() {
    const { labelText = '' } = this.props;
    return (`
          {{{ InputField
                label='${labelText}'
                type='text'
                name='nameChat'
                validate=validate.nameChat
                ref='input'
                inputContainerClassName='input-container'
                inputClassName='input'
                inputLabelClassName='input-label'
          }}}`
    )
  }

  protected render(): string {
      return (`
              {{{ Modal 
                    caption='${this.props.caption}' 
                    okText='${this.props.okText}' 
                    cancelText='Закрыть' 
                    okClick=okInputClick 
                    cancelClick=cancelClick 
                    children="${this.getChildren()}" 
                    ref='modal'
              }}}
      `)
  }
}
