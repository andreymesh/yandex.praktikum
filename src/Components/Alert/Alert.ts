import { alertController } from "../../core/AlertController";
import Block from "../../core/Block";
import { IProps } from "../../types/IProps";

interface IModalProps {
    message: string;
    okClick?: (event: Event) => void;
}

export class Alert extends Block<IModalProps> {
    constructor(props: IProps<IModalProps>) {      
        super({...props, okClick() {
            alertController.closeModal();
        },})
    }

    protected render(): string {
        const { message = '' } = this.props;
        return (`
                <div class="alert">
                    <p class="alert-message">
                        ${message}
                    </p>                   
                    <div class="alert-close">
                     {{{ Button onClick=okClick type="close"}}}</div>
                </div>
        `)
    }
}
