import * as os from "os";
import * as path from "path";
// import * as fs from "fs";
import { fileService, IFileService } from "./FileService";

interface IConfigService {
  readKey(key: string): string;
  writeKey(key: string, value: string): void;
}

type initConfig = {
  token: string;
  workFolder: string;
};

class ConfigService implements IConfigService {
  private fileService: IFileService;
  private path: string;

  private initConfig: initConfig = {
    token: "",
    workFolder: "",
  };

  constructor(fileService: IFileService) {
    this.fileService = fileService;

    // const homedir = fileService.getHomeDir();
    const homedir = os.homedir();
    const configName = ".telegraph-image-uploader.json";
    this.path = path.join(homedir, configName);

    this.exist = this.exist.bind(this);
    this.create = this.create.bind(this);
    this.readKey = this.readKey.bind(this);
    this.writeKey = this.writeKey.bind(this);
    this.readConfig = this.readConfig.bind(this);
    this.chooseFolder = this.chooseFolder.bind(this);
  }

  readKey(key: keyof initConfig): string {
    if (!this.exist()) this.create();

    const config = this.readConfig();
    return config[key];
  }

  writeKey(key: keyof initConfig, value: string): void {
    if (!this.exist()) this.create();

    const config = this.readConfig();
    config[key] = value;

    this.create(config);
  }

  readConfig(): initConfig {
    const stringFile = fileService.read(this.path);
    const object = JSON.parse(stringFile);

    return object;
  }

  chooseFolder(pathFile: string) {
    const newPath = path.dirname(pathFile);
    // this.writeKey("workFolder", newPath);

    return newPath;
  }

  private exist(): boolean {
    return this.fileService.exist(this.path);
  }

  private create(config = this.initConfig): void {
    const path = this.path;
    const payload = JSON.stringify(config);
    this.fileService.create(path, payload);
  }
}

export const configService = new ConfigService(fileService);
