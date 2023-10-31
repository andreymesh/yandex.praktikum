import { BASE_RESOURCES_URL } from "../../config";
import Block from "../../core/Block";
import { modalController } from "../../core/ModalController";
import { uploadResource } from "../../services/resources";
import { IFile } from "../../types/IFile";
import { IProps } from "../../types/IProps";
import { addActive, deleteActive, loadNewFileFromDrag } from "../../utils/loadFile";
import { showModalAlert } from "../../utils/showModalAlert";

interface IModalLoadFileProps {
    okClick?: () => void,
    cancelClick?: () => void,
    onAddFile?: (e: InputEvent) => void,
    file?: IFile | null;
    type: 'picture' | 'video'|'document'|'location'
}

export class ModalLoadFile extends Block<IModalLoadFileProps> {
    constructor(props: IProps<IModalLoadFileProps>) {
        props.file = null;
        props.okClick = async () => {
            if (!this.props.file) {
                showModalAlert('Звгрузка файла!')
            } else {
                const chat = window.store.getState().currentChat;
                if (chat && chat.connection) {
                    chat.connection.sendFile(String(this.props.file.id));
                }
            }
            modalController.closeModal();
        };
        props.cancelClick = () => {
            modalController.closeModal();
        };

        const _onAddFile = <TEvent>(e: TEvent) => {
            deleteActive(e as Event);
            const formData = loadNewFileFromDrag<TEvent>(e, 'resource');
            if (formData) {
                uploadResource(formData).then(file => {
                    this.props.file = file as IFile;
                    this.setProps(this.props);
                }).catch((error) => console.error(error));
            }
        };
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
        const {file } = this.props;
        let result: string;
        if (file) {
            result = `<img src='${BASE_RESOURCES_URL + file.path}' alt='file' class='modal-load-file-image'/>`
        } else {
            result = ''
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
        )
    }

    protected render(): string {
        return (`
                 {{{  Modal 
                         caption="Add File" 
                         okText='Send' 
                         cancelText='Cancel' 
                         okClick=okClick 
                         cancelClick=cancelClick 
                         children="${this.getChildren()}" 
                 }}}
        `)
    }
}
