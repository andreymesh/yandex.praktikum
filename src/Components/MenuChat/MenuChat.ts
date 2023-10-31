import Block from "../../core/Block";
import { ModalChatUsers } from "../ModalChatUsers";
import { ModalAvatar } from "../ModalAvatar";
import { modalController } from "../../core/ModalController";
import { IChat } from "../../types/IChat";
import { IProps } from "../../types/IProps";

interface IMenuChatProps {
  currentChat?: IChat | null;
  isOpenedMenu?: boolean;
  addUser: () => void;
  deleteUser: () => void;
  changeAvatarChat: () => void;
  closeMenu: () => void;
}

export class MenuChat extends Block<IMenuChatProps> {
  constructor(props: IProps<IMenuChatProps>) {
    props.currentChat = window.store.getState().currentChat;
      props.addUser = () => {
          modalController.addModal((new ModalChatUsers({
              users: [],
              type: 'add',
              ref: "modal",
              okClick: (result: string) => {
                  console.log(result);
              },
          })));
          modalController.openModal();
          this.props.closeMenu();
      };
      props.deleteUser = () => {
          modalController.addModal((new ModalChatUsers({
              users: window.store.getState().currentChat?.users || [],
              type: 'delete',
              ref: "modal",
              okClick: (result: string) => {
                  console.log(result);
              },
          })));
          modalController.openModal();
          this.props.closeMenu();
      };
      props.changeAvatarChat = () => {
          modalController.addModal((new ModalAvatar({
              oldAvatar: window.store.getState().currentChat?.avatar || '',
              type: 'chat'
          })));
          modalController.openModal();
          this.props.closeMenu();
      };
      super({ ...props });
    }

  protected render(): string {
    const { isOpenedMenu = false } = this.props;
    return (`            
        <nav class='${`menu menu-chat container-shadow ${isOpenedMenu ? 'opened' : 'hide'}`}'>
            <ul >
                {{{ MenuItem caption='Добавить пользователя' onClick=addUser icon='plus' }}}
                {{{ MenuItem caption='Удалить пользователя' onClick=deleteUser icon='delete' }}}
                {{{ MenuItem caption='Изменить аватар чата' onClick=changeAvatarChat icon='avatar' }}}
            </ul>
        </nav>
    `)
  }
}
