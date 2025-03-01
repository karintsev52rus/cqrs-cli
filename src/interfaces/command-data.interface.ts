export interface ICommandReqData {
  commandName: string;
  handlerName: string;
}

export interface ICommandResData {
  handlerData: string;
  commandData: string;
}

export interface IQueryReqData {
  queryName: string;
  handlerName: string;
}

export interface IQueryResData {
  queryData: string;
  handlerData: string;
}
