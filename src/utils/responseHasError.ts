import { BASE_URLS } from "../config";
import { modalController } from "../core/ModalController";
import Router from "../core/Router";
import { IResult } from "../types/IResult";
import { showAlert } from "./showAlert";
import { showModalAlert } from "./showModalAlert";

export const responseHasError = (response: IResult) => {
  switch (response.status) {
    case 200:
      return false;
    case 404:
      Router.getRouter().go(BASE_URLS.notFound);
      return response?.statusText ?? 404;
    case 500:
      Router.getRouter().go(BASE_URLS.internalServerError);
      return response?.statusText ?? 500;
    default: {
      const error = response.data?.reason;
      if (error?.includes('Cookie')) {
        return error;
      } else {
        if (modalController.opened) {
          showModalAlert(error);
        } else {
          showAlert(error);
        }
      }
      return error;
    }
  }
}
