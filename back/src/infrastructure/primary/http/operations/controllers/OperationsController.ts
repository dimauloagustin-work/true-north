import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard, JwtRequest } from '../../auth/JwtAuthGuard';
import { TwoParamsOperation } from './Requests/TwoParamsOperation';
import { DivisionOperation } from './Requests/DivisionOperation';
import { SquareRootOperation } from './Requests/SquareRootOperation';
import { AdditionOperationService } from 'src/application/operations/AdditionOperationService';
import { SubtractionOperationService } from 'src/application/operations/SubstractionOperationService';
import { MultiplicationOperationService } from 'src/application/operations/MultiplicationOperationService';
import { DivisionOperationService } from 'src/application/operations/DivisionOperationService';
import { SquareRootOperationService } from 'src/application/operations/SquareRootOperationService';
import { ResultResponse } from './Responses/ResultResponse';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { RecordService } from 'src/application/RecordService';
import { OperationsResponse } from './Responses/OperationsResponse';
import { GetRecordsQuery } from './Requests/GetRecordsQuery';
import { RandomStringOperationService } from 'src/application/operations/RandomStringOperationService';

@Controller({
  path:'operations',
  version:'1'
})
@ApiBearerAuth()
export class OperationsController {
  constructor(
    private readonly additionService: AdditionOperationService,
    private readonly subtractionService: SubtractionOperationService,
    private readonly multiplicationService: MultiplicationOperationService,
    private readonly divisionService: DivisionOperationService,
    private readonly squareRootService: SquareRootOperationService,
    private readonly randomStringService: RandomStringOperationService,
    private readonly recordService: RecordService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('additions')
  @ApiCreatedResponse({
    type: ResultResponse,
  })
  async addition(
    @Body() body: TwoParamsOperation,
    @Request() req: JwtRequest,
  ): Promise<ResultResponse> {
    return await this.additionService.execute(
      req.user.payload.user.id,
      body.n1,
      body.n2,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('subtractions')
  @ApiCreatedResponse({
    type: ResultResponse,
  })
  async subtraction(
    @Body() body: TwoParamsOperation,
    @Request() req: JwtRequest,
  ): Promise<ResultResponse> {
    return await this.subtractionService.execute(
      req.user.payload.user.id,
      body.n1,
      body.n2,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('multiplications')
  @ApiCreatedResponse({
    type: ResultResponse,
  })
  async multiplication(
    @Body() body: TwoParamsOperation,
    @Request() req: JwtRequest,
  ): Promise<ResultResponse> {
    return await this.multiplicationService.execute(
      req.user.payload.user.id,
      body.n1,
      body.n2,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('divisions')
  @ApiCreatedResponse({
    type: ResultResponse,
  })
  async division(
    @Body() body: DivisionOperation,
    @Request() req: JwtRequest,
  ): Promise<ResultResponse> {
    return await this.divisionService.execute(
      req.user.payload.user.id,
      body.n1,
      body.n2,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('square-roots')
  @ApiCreatedResponse({
    type: ResultResponse,
  })
  async square_root(
    @Body() body: SquareRootOperation,
    @Request() req: JwtRequest,
  ): Promise<ResultResponse> {
    return await this.squareRootService.execute(
      req.user.payload.user.id,
      body.n,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('random-strings')
  @ApiCreatedResponse({
    type: ResultResponse,
  })
  async random_string(@Request() req: JwtRequest): Promise<ResultResponse> {
    return await this.randomStringService.execute(req.user.payload.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({
    type: OperationsResponse,
  })
  @ApiQuery({ name: 'type', type: 'string', required: false })
  @ApiQuery({ name: 'response', type: 'string', required: false })
  @ApiQuery({ name: 'balance', type: 'number', required: false })
  @ApiQuery({ name: 'skip', type: 'number', required: false })
  @ApiQuery({ name: 'take', type: 'number', required: false })
  async getRecords(
    @Query() query: GetRecordsQuery,
  ): Promise<OperationsResponse> {
    const { result, count } = await this.recordService.find(
      query.skip,
      query.take,
      query.type,
      query.response,
      query.balance,
    );
    return new OperationsResponse(result, count);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiNoContentResponse()
  @ApiParam({ name: 'id', type: 'integer' })
  async deleteRecord(@Param() id: number): Promise<void> {
    await this.recordService.delete(id);
  }
}
