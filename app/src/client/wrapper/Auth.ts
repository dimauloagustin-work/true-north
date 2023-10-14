import { OpenAPI, DefaultService, ApiError } from "../api";

export const login = async (usr: string, pass: string) => {
  try {
    const { access_token } = await DefaultService.authControllerLogin({
      name: usr,
      pass: pass,
    });
    OpenAPI.TOKEN = access_token;
  } catch (error) {
    if (error instanceof ApiError) throw new Error(error.body.message);
    throw error;
  }
};
