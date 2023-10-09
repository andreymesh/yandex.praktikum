import { Block } from "../../core";

interface IErrorLineProps {
    error?: string;

}
export class ErrorLine extends Block {
    constructor(props: IErrorLineProps) {
        super(props);
    }
    protected render() {
        const { error } = this.props;
        return `<label ref="errorLine" class="input-text-error">${error ?? ""}</label>`
    }
}
