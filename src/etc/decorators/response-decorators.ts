import { SetMetadata, Type, applyDecorators } from "@nestjs/common";
import { ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseDto } from "src/api/todos/dto/response.dto";

export const ResponseMsg = (message: string) => SetMetadata('responseMessage', message);

export interface GenericApiResponseOption<TModel extends Type<any>> {
  model: TModel,
  status?: number,
  description?: string,
  isArray?: Boolean
}

export const GenericApiResponse = (option: GenericApiResponseOption<Type>) => {
  const isArray = option.isArray || false;

  if (isArray) {
    return applyDecorators(
      ApiResponse({
        status: option.status,
        description: option.description,
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                result: {
                  type: 'array',
                  items: { $ref: getSchemaPath(option.model) }
                },
              },
            },
          ],
        },
      }),
    );
  }

  return applyDecorators(
    ApiResponse({
      status: option.status,
      description: option.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              result: {
                $ref: getSchemaPath(option.model)
              },
            },
          },
        ],
      },
    }),
  );
};