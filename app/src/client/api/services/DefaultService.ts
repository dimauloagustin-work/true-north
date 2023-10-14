/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DivisionOperation } from '../models/DivisionOperation';
import type { LoginResponse } from '../models/LoginResponse';
import type { OperationsResponse } from '../models/OperationsResponse';
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
     * @returns ResultResponse
     * @throws ApiError
     */
    public static operationsControllerRandomString(): CancelablePromise<ResultResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/operations/random-strings',
        });
    }

    /**
     * @param take
     * @param skip
     * @param balance
     * @param response
     * @param type
     * @returns OperationsResponse
     * @throws ApiError
     */
    public static operationsControllerGetRecords(
        take?: number,
        skip?: number,
        balance?: number,
        response?: string,
        type?: string,
    ): CancelablePromise<OperationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operations',
            query: {
                'take': take,
                'skip': skip,
                'balance': balance,
                'response': response,
                'type': type,
            },
        });
    }

    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static operationsControllerDeleteRecord(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/operations/{id}',
            path: {
                'id': id,
            },
        });
    }

}
