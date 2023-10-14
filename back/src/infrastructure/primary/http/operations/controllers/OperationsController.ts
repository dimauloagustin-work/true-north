import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
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
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@Controller('operations')
@ApiBearerAuth()
export class OperationsController {
  constructor(
    private readonly additionService: AdditionOperationService,
    private readonly subtractionService: SubtractionOperationService,
    private readonly multiplicationService: MultiplicationOperationService,
    private readonly divisionService: DivisionOperationService,
    private readonly squareRootService: SquareRootOperationService,
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
  async random_string(@Request() req: JwtRequest) {
    return;
  }
}
