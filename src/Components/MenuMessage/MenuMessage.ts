import { ModalLoadFile } from "../ModalLoadFile";
import { modalController } from "../../core/ModalController";
import { IChat } from "../../types/IChat";
import Block from "../../core/Block";
import { IProps } from "../../types/IProps";

interface IMenuMessageProps {
    currentChat?: IChat | null,
    isOpenedMenu: boolean,
    addMedia: () => void,
    addFile: () => void,
    addLocation: () => void,
    closeMenu: () => void,
}

export class MenuMessage extends Block<IMenuMessageProps> {
  constructor(props: IProps<IMenuMessageProps>) {
    props.currentChat = window.store.getState().currentChat;
    props.addMedia = () => {
      console.log('add media!');
      modalController.addModal((new ModalLoadFile({
        file: null,
        type: 'picture'
      })));
      modalController.openModal();
      this.props.closeMenu();
    };
    props.addFile = () => {
      console.log('add file!');
      this.props.closeMenu();
    };
    props.addLocation = () => {
      console.log('add location!');
      this.props.closeMenu();
    };

    super({ ...props });
  }

  protected render(): string {
    const { isOpenedMenu = false } = this.props;
    return (`            
        <nav class='${`menu menu-message container-shadow ${isOpenedMenu ? 'opened' : 'hide'}`}'>
            <ul >
                {{{ MenuItem caption='Picture' onClick=addMedia icon='media' }}}
                {{{ MenuItem caption='File' onClick=addFile icon='file' disabled=true }}}
                {{{ MenuItem caption='Location' onClick=addLocation icon='location' disabled=true }}}
            </ul>
        </nav>
    `)
  }
}
