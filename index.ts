import { CqrsService } from "./src/services/cqrs-service";
import { ArgsService } from "./src/services/args-service";
import { FileFolders, FileTypes, Tasks } from "./src/enums/tasks";
import { toCamelCase } from "./src/helpers/to-camel-case.helper";
import { FileService } from "./src/services/file-service";

const inputArgs = process.argv;

const argsService = new ArgsService();
const cqrsService = new CqrsService();
const fileService = new FileService();

export async function GenerateResource(inputArgs: string[]) {
  const argsData = argsService.getArgs(inputArgs);

  if (argsData.task === Tasks.command) {
    const camelCaseName = toCamelCase(argsData.name);
    const commandReqData = cqrsService.createCommandReqData(camelCaseName);
    const command = cqrsService.generateCommand(commandReqData.commandName);
    const commandFileName = fileService.createFileName(
      argsData.name,
      Tasks.command
    );
    const commandfilePath = fileService.createFilePath(
      "output",
      FileFolders.command,
      argsData.name
    );
    fileService.createFile(commandFileName, commandfilePath, command);

    const handlerFileName = fileService.createFileName(
      argsData.name,
      "handler"
    );
    const commandHandler = cqrsService.generateCommandHandler(commandReqData);

    const handlerFilePath = fileService.createFilePath(
      "output",
      FileFolders.command,
      argsData.name
    );
    fileService.createFile(handlerFileName, handlerFilePath, commandHandler);
    const indexFileData = cqrsService.generateIndexFile(
      argsData.name,
      FileTypes.command
    );
    fileService.createFile("index.ts", handlerFilePath, indexFileData);
    return `${commandFileName} создан`;
  }

  if (argsData.task === Tasks.query) {
    const camelCaseName = toCamelCase(argsData.name);
    const queryReqData = cqrsService.createQueryReqData(camelCaseName);
    const query = cqrsService.generateQuery(queryReqData.queryName);
    const queryFileName = fileService.createFileName(
      argsData.name,
      Tasks.query
    );
    const queryfilePath = fileService.createFilePath(
      "output",
      FileFolders.query,
      argsData.name
    );
    fileService.createFile(queryFileName, queryfilePath, query);
    const handlerFileName = fileService.createFileName(
      argsData.name,
      "handler"
    );
    const queryHandler = cqrsService.generateQueryHandler(queryReqData);

    const handlerFilePath = fileService.createFilePath(
      "output",
      FileFolders.query,
      argsData.name
    );
    fileService.createFile(handlerFileName, handlerFilePath, queryHandler);
    const indexFileData = cqrsService.generateIndexFile(
      argsData.name,
      FileTypes.query
    );
    fileService.createFile("index.ts", handlerFilePath, indexFileData);
    return `${queryFileName} создан`;
  }
}

GenerateResource(inputArgs)
  .then((data) => console.log(data))
  .catch((err) => {
    console.log(err);
  });
