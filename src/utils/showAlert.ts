import { Alert } from "../Components/Alert";
import { alertController } from "../core/AlertController";

export const showAlert = (message: string) => {
  alertController.addModal((new Alert({
    message: message || ''
  })));
  alertController.openModal();
}
