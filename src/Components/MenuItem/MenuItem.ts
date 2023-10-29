import Block from "../../core/Block";
import { IProps } from "../../types/IProps";

export interface IMenuItemProps {
    caption: string,
    icon: 'media' | 'file' | 'location' | 'plus' | 'delete' | 'avatar';
    onClick: () => void;
    disabled?: boolean;
}

export class MenuItem extends Block<IMenuItemProps> {
    constructor(props: IProps<IMenuItemProps>) {
        super({
            ...props,
            events: {
                click: () => {
                    if(this.props.disabled)return;
                    this.props.onClick();
                }
            }
        })
    }

    public renderForList = this.render;

    protected render(): string {
        const {caption = '', icon} = this.props;
        return (`
            <li class='menu-item ${this.props.disabled ? `disabled` : ``}'>
                <div class='menu-item-icon ${`menu-item-icon-` + icon}'></div>
                <p  class='menu-item-caption'>${caption}</p>               
            </li>
        `)
    }
}
