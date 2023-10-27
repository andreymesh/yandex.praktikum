import { Block } from ".";

class AlertController {

  private static __instance: AlertController;
  private dialog: HTMLDialogElement | null = null;
  

  constructor() {
    if (AlertController.__instance) {
      return AlertController.__instance;
    }
    
    AlertController.__instance = this;
    
    this.dialog = document.getElementById('dialog-alert') as HTMLDialogElement;
  }

  public static getInstance() {
    return this.__instance;
  }

  public addModal(modal: Block) {
    const htmlElement = modal.getContent();
    if (!this.dialog?.firstElementChild) this.dialog?.append(document.createElement('div'));
    if (htmlElement) this.dialog?.firstElementChild?.replaceWith(htmlElement);
  }

  public openModal() {
    this.dialog?.show();
  }

  public open() {
    this.dialog?.showModal();
  }

  public closeModal() {
    this.dialog?.close();
  }
}
export const alertController = new AlertController();
