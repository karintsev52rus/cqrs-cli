import * as fs from "node:fs";
import * as path from "path";

export class FileService {
  async createFile(fileName: string, folderPath: string, fileData: string) {
    const filePath = path.join(folderPath, fileName);
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, fileData);
    } else {
      fs.mkdirSync(folderPath, { recursive: true });
      fs.writeFileSync(filePath, fileData);
    }
  }

  createFileName(name: string, task: string) {
    const fileType = task.toLowerCase();
    return `${name}.${fileType}.ts`;
  }

  createFilePath(
    outputDir: string,
    commonFolderName: string,
    fileFolder: string
  ) {
    return path.join(outputDir, commonFolderName, fileFolder);
  }
}
