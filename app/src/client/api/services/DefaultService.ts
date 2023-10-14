/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DivisionOperation } from '../models/DivisionOperation';
import type { LoginResponse } from '../models/LoginResponse';
import type { ResultResponse } from '../models/ResultResponse';
import type { SquareRootOperation } from '../models/SquareRootOperation';
import type { TwoParamsOperation } from '../models/TwoParamsOperation';
import type { UserRequest } from '../models/UserRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @param requestBody
     * @returns LoginResponse
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: UserRequest,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns ResultResponse
     * @throws ApiError
     */
    public static operationsControllerAddition(
        requestBody: TwoParamsOperation,
    ): CancelablePromise<ResultResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/operations/additions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns ResultResponse
     * @throws ApiError
     */
    public static operationsControllerSubtraction(
        requestBody: TwoParamsOperation,
    ): CancelablePromise<ResultResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/operations/subtractions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns ResultResponse
     * @throws ApiError
     */
    public static operationsControllerMultiplication(
        requestBody: TwoParamsOperation,
    ): CancelablePromise<ResultResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/operations/multiplications',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns ResultResponse
     * @throws ApiError
     */
    public static operationsControllerDivision(
        requestBody: DivisionOperation,
    ): CancelablePromise<ResultResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/operations/divisions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns ResultResponse
     * @throws ApiError
     */
    public static operationsControllerSquareRoot(
        requestBody: SquareRootOperation,
    ): CancelablePromise<ResultResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/operations/square-roots',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static operationsControllerRandomString(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/operations/random-strings',
        });
    }

}
