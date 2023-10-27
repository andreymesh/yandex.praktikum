import { Alert } from "../Components";
import { alertController } from "../core";

export const showModalAlert = (message: string) => {
  alertController.addModal((new Alert({
    message: message || ''
  })));
  alertController.open();
}
