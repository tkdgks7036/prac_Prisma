import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<TData> {
  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({ example: '200' })
  status: number;

  result: TData;
}