import { Alert } from "../Components/Alert";
import { alertController } from "../core/AlertController";

export const showModalAlert = (message: string) => {
  alertController.addModal((new Alert({
    message: message || ''
  })));
  alertController.open();
}
