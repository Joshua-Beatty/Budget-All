import { path } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/core";
import { Command } from "@tauri-apps/plugin-shell";
import { Rss } from "lucide-react";


class Client {
    token: string;
    pkcs12: string;

    constructor(token: string, pkcs12: string) {
        this.token = token;
        this.pkcs12 = pkcs12
    }

    // async get(url: string) {
    //     const request = await Command.sidecar('curl', [
    //         '-X', "GET", url,
    //         "--cert", await this.certPath,
    //         "--key", await this.keyPath,
    //         "-u", `${this.token}:`
    //       ]).execute();
    //     return JSON.parse(request.stdout)
    // }

    // async post(url: string, data: any) {
    //     const request = await Command.sidecar('curl', [
    //         '-X', "POST", 
    //         "-H", "Content-Type: application/json",
    //         "-d", JSON.stringify(data),
    //         url,
    //         "--cert", await this.certPath,
    //         "--key", await this.keyPath,
    //         "-u", `${this.token}:`
    //       ]).execute();
    //     return JSON.parse(request.stdout)
    // }

    async get(url: string){
        const response = await invoke("fetch_with_mtls", {
            username: this.token,
            url,
            pkcs12B64: this.pkcs12,
            pkcs12Password: "",
        }) as any
        console.log(response)
        return JSON.parse(response)

    }

}

export default Client