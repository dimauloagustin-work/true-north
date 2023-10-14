import { OpenAPI, DefaultService } from "../api";
import { catchError } from "./Base";

export const login = async (usr: string, pass: string) => {
  try {
    const { access_token } = await DefaultService.authControllerLogin({
      name: usr,
      pass: pass,
    });
    OpenAPI.TOKEN = access_token;
  } catch (error) {
    throw catchError(error);
  }
};
