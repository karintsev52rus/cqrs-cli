import { FileTypes } from "enums/tasks";
import {
  ICommandReqData,
  IQueryReqData,
} from "../interfaces/command-data.interface";

export class CqrsService {
  generateCommandHandler(commandReqData: ICommandReqData) {
    const { commandName, handlerName } = commandReqData;
    return `
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ICommandResponse } from 'src/common/types/command-response.type';

@CommandHandler(${commandName})
export class ${handlerName}
    implements ICommandHandler<${commandName}>
{
    private readonly logger = new Logger(${handlerName}.name);
    constructor(private readonly) {}
    async execute( {dto} : ${commandName}): Promise<ICommandResponse<>> {
        try {
            
        } catch (e) {
            this.logger.error(e);
            return {
                isSuccess: false
            };
        }
    }
}
`;
  }

  generateQueryHandler(queryReqData: IQueryReqData) {
    const { queryName, handlerName } = queryReqData;
    return `
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ICommandResponse } from 'src/common/types/command-response.type';

@QueryHandler(${queryName})
  export class ${handlerName}
    implements IQueryHandler<${queryName}, ICommandResponse<>>
{
    private readonly logger = new Logger(${queryName}.name);
    constructor(private readonly) {}

    async execute({dto}: ${queryName}): Promise<ICommandResponse<>> {
        try {

        } catch (e) {
            this.logger.error(e);
            return {
                isSuccess: false
            };
        }
    }
}
    `;
  }

  generateCommand(commandName: string) {
    return `
export class ${commandName} {
  constructor(public readonly ) {}
}
    `;
  }

  generateQuery(queryName: string) {
    return `
export class ${queryName} {
  constructor(public readonly ) {}
}
    `;
  }

  createCommandReqData(commandName: string): ICommandReqData {
    return {
      commandName: `${commandName}Command`,
      handlerName: `${commandName}Handler`,
    };
  }

  createQueryReqData(queryName: string): IQueryReqData {
    return {
      queryName: `${queryName}Query`,
      handlerName: `${queryName}Handler`,
    };
  }

  generateIndexFile(fileName: string, fileType: FileTypes) {
    return `
export * from './${fileName}.handler';
export * from './${fileName}.${fileType}';
    `;
  }
}
