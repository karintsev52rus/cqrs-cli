import { IArgsData } from "../interfaces/args-data.interface";
import { ArgsTasks, Tasks } from "../enums/tasks";

export class ArgsService {
  getArgs(inputArgs: string[]): IArgsData {
    const args = inputArgs.splice(2, inputArgs.length);
    const argsData: IArgsData = { name: null, task: null };
    if (args.length > 1) {
      const [task, name] = args;
      if (task === ArgsTasks.command) {
        argsData.task = Tasks.command;
      }
      if (task === ArgsTasks.query) {
        argsData.task = Tasks.query;
      }
      if (name) {
        argsData.name = name;
      }
      return argsData;
    }
  }
}
