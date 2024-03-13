import { SetMetadata } from "@nestjs/common";

export const ResponseMsg = (message: string) => SetMetadata('responseMessage', message);