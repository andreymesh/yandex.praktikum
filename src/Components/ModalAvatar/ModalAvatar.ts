import { BASE_RESOURCES_URL } from "../../config";
import Block from "../../core/Block";
import { modalController } from "../../core/ModalController";
import { updateChatAvatar } from "../../services/chat";
import { updateUserAvatar, updateUserProfile } from "../../services/userSettings";
import { addActive, deleteActive, loadNewFileFromDrag } from "../../utils/loadFile";

interface IModalAvatarProps  {
  oldAvatar?: string;
  newAvatar?: string;
  okClick?: () => void;
  cancelClick?: () => void;
  onAddFile?: (e: InputEvent) => void;
  file?: unknown;
  type: 'user' | 'chat';
}

export class ModalAvatar extends Block<IModalAvatarProps> {
  constructor(props: IModalAvatarProps) {
    props.file = null;
    props.newAvatar = '';
    props.okClick = async () => {
      if (this.props.type === 'chat') {
        const chat = window.store.getState().chats?.find(item => item.id === window.store.getState().currentChat?.id);
        if (chat) {
          chat.avatar = window.store.getState().currentChat?.avatar;
          window.store.set({ chats: window.store.getState().chats });
        }
      }
      modalController.closeModal();
    }
    props.cancelClick = () => {
      switch (this.props.type) {
        case "user": {
          const user = window.store.getState().user;
          if (user && this.props.oldAvatar) {
            this.props.newAvatar = '';
            updateUserProfile({ ...user, avatar: this.props.oldAvatar }).then(() => {
              modalController.closeModal();
            });
          }
          modalController.closeModal();
          break;
        }
        case "chat": {
          const chat = window.store.getState().currentChat;
          if (chat && this.props.oldAvatar) {
            this.props.newAvatar = '';
            modalController.closeModal();
          }
          modalController.closeModal();
          break;
        }
      }
    }

    const _onAddFile = <TEvent>(e: TEvent) => {
      deleteActive(e as Event);
      const formData = loadNewFileFromDrag<TEvent>(e);
      if (formData) {
        switch (this.props.type) {
          case "user": {
            updateUserAvatar(formData).then(user => {
              this.props.newAvatar = user.avatar;
              modalController.addModal((new ModalAvatar({
                oldAvatar: window.store.getState().user?.avatar || '',
                type: 'user'
              })));
            }).catch((error) => console.warn(error));
            break;
          }
          case "chat": {
            const _chat = window.store.getState().currentChat;
            if (!_chat) break;
            updateChatAvatar(formData, _chat.id)
              .then(chat => {
                this.props.newAvatar = chat.avatar;
                modalController.addModal((new ModalAvatar({
                  oldAvatar: window.store.getState().currentChat?.avatar || '',
                  type: 'chat'
                })));
              })
              .catch((error) => console.warn(error));
            break;
          }
        }

      }
    }
    super({
      ...props,
      events: {
        dragenter: (e: Event) => {
          addActive(e);
        },
        dragover: (e: Event) => {
          addActive(e);
        },
        dragleave: (e: Event) => {
          deleteActive(e);
        },
        drop: _onAddFile<DragEvent>,
        change: _onAddFile<Event>,

      }
    })
  }

  getChildren() {
    const { oldAvatar = '', newAvatar = '' } = this.props;
    let result: string;
    if (newAvatar) {
        result = `<img src='${BASE_RESOURCES_URL + newAvatar}' alt='image avatar' class='modal-avatar-image'/>`
    } else {
        result = oldAvatar ? `<img src='${BASE_RESOURCES_URL + oldAvatar}' alt='image avatar' class='modal-avatar-image'/>` : `<div class='modal-avatar-empty'></div>`
    }
    return (
      `<div class='modal-avatar' id='modal-avatar'>
            ${result}
           <input id='file-input' type='file' name='file' accept='.jpg, .png,.svg'
            class='modal-avatar-input' 
           >
           <label  for='file-input' class='modal-avatar-label'>Выберите файл</label>
           <span>или перетащите его сюда</span>
         </div>
        `
    );
  }

  protected render(): string {
    return (`
             {{{  Modal 
                     caption="Изменить аватар" 
                     okText='Сохранить' 
                     cancelText='Закрыть' 
                     okClick=okClick 
                     cancelClick=cancelClick 
                     children="${this.getChildren()}" 
             }}}
    `)
  }
}
