import { Block, IProps } from "../../core";

interface IModalProps {
    caption: string;
    okText: string;
    okClick: (event: Event) => void;
    cancelText: string;
    cancelClick: () => void;
    children?: string;
}

export class Modal extends Block<IModalProps> {
    constructor(props: IProps<IModalProps>) {
        super({
            ...props,
            events:{
                submit:(event: Event)=>{
                    event.stopPropagation();
                    event.preventDefault();
                    this.props.okClick(event);
                }
            }
        })
    }

    protected render(): string {
        const {caption = '', okText = '', cancelText = '',children=''} = this.props;
        return (`
                <form class="modal " >
                    <h2 class="modal-header">
                        ${caption}
                    </h2>
                     <div>
                        ${children}
                    </div>
                    <div class="modal-footer">
                        {{{ Button label="${okText}" onClick=okClick type="primary"}}}
                        {{{ Button label="${cancelText}" onClick=cancelClick type='link'}}}
                    </div>
                </form>
        `)
    }
}
