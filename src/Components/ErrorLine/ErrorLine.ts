import Block from "../../core/Block";
import { IProps } from "../../types/IProps";

interface IErrorLineProps {
    error?: string;

}
export class ErrorLine extends Block<IErrorLineProps> {
    constructor(props: IProps<IErrorLineProps>) {
        super({ ...props });
    }
    protected render() {
        const { error } = this.props;
        return `<label ref="errorLine" class="input-text-error">${error ?? ""}</label>`
    }
}
