import { Alert } from "../Components";
import { alertController } from "../core";

export const showAlert = (message: string) => {
  alertController.addModal((new Alert({
    message: message || ''
  })));
  alertController.openModal();
}
