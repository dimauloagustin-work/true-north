import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { JwtAuthGuard, JwtRequest } from '../../auth/JwtAuthGuard';
import { TwoParamsOperation } from './Requests/TwoParamsOperation';
import { DivisionOperation } from './Requests/DivisionOperation';
import { SquareRootOperation } from './Requests/SquareRootOperation';
import { AdditionOperationService } from 'src/application/operations/AdditionOperationService';

@Controller('operations')
export class OperationsController {
  constructor(private readonly additionService: AdditionOperationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('additions')
  async addition(
    @Body() body: TwoParamsOperation,
    @Request() req: JwtRequest,
  ) {
    return await this.additionService.execute(
      req.user.payload.user.id,
      body.n1,
      body.n2,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('subtractions')
  async subtraction(@Body() body: TwoParamsOperation) {
    return body;
  }

  @UseGuards(JwtAuthGuard)
  @Post('multiplications')
  async multiplication(@Body() body: TwoParamsOperation) {
    return body;
  }

  @UseGuards(JwtAuthGuard)
  @Post('divisions')
  async division(@Body() body: DivisionOperation) {
    return body;
  }

  @UseGuards(JwtAuthGuard)
  @Post('square_roots')
  async square_root(@Body() body: SquareRootOperation) {
    return body;
  }

  @UseGuards(JwtAuthGuard)
  @Post('random_strings')
  async random_string() {
    return;
  }
}
