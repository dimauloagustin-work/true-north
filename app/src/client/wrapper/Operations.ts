import { OpenAPI, DefaultService, ApiError } from "../api";
import { catchError } from "./Base";
export const add = async (n1: number, n2: number) => {
  try {
    return await DefaultService.operationsControllerAddition({
      n1,
      n2,
    });
  } catch (error) {
    throw catchError(error);
  }
};

export const substract = async (n1: number, n2: number) => {
  try {
    return await DefaultService.operationsControllerSubtraction({
      n1,
      n2,
    });
  } catch (error) {
    throw catchError(error);
  }
};

export const multiply = async (n1: number, n2: number) => {
  try {
    return await DefaultService.operationsControllerMultiplication({
      n1,
      n2,
    });
  } catch (error) {
    throw catchError(error);
  }
};

export const divide = async (n1: number, n2: number) => {
  try {
    if (n2 === 0) throw new Error("second number should not be 0");
    return await DefaultService.operationsControllerDivision({
      n1,
      n2,
    });
  } catch (error) {
    throw catchError(error);
  }
};

export const root = async (n: number) => {
  try {
    if (n < 0) throw new Error("number shuld be greater than 0");
    return await DefaultService.operationsControllerSquareRoot({
      n,
    });
  } catch (error) {
    throw catchError(error);
  }
};

export const randomString = async () => {
  try {
    return await DefaultService.operationsControllerRandomString();
  } catch (error) {
    throw catchError(error);
  }
};

export const find = async (
  skip?: number | undefined,
  take?: number | undefined,
  balance?: number | undefined,
  response?: string | undefined,
  type?: string | undefined
) => {
  try {
    return await DefaultService.operationsControllerGetRecords(
      take,
      skip,
      balance,
      response,
      type
    );
  } catch (error) {
    throw catchError(error);
  }
};

export const remove = async (id: number) => {
  try {
    return await DefaultService.operationsControllerDeleteRecord(id);
  } catch (error) {
    throw catchError(error);
  }
};
