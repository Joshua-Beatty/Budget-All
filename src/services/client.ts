import { path } from "@tauri-apps/api";
import { Command } from "@tauri-apps/plugin-shell";


class Client {
    token: string;
    certPath: Promise<string>;
    keyPath: Promise<string>;

    constructor(token: string) {
        this.token = token;
        this.certPath = path.appDataDir().then(dir=>path.join(dir, "cert.pem"))
        this.keyPath = path.appDataDir().then(dir=>path.join(dir, "key.pem"))
    }

    async get(url: string) {
        const request = await Command.sidecar('curl', [
            '-X', "GET", url,
            "--cert", await this.certPath,
            "--key", await this.keyPath,
            "-u", `${this.token}:`
          ]).execute();
        return JSON.parse(request.stdout)
    }

    async post(url: string, data: any) {
        const request = await Command.sidecar('curl', [
            '-X', "POST", 
            "-H", "Content-Type: application/json",
            "-d", JSON.stringify(data),
            url,
            "--cert", await this.certPath,
            "--key", await this.keyPath,
            "-u", `${this.token}:`
          ]).execute();
        return JSON.parse(request.stdout)
    }

}

export default Client