import { load } from "@tauri-apps/plugin-store";

const storePromise = load('transactions.json', { autoSave: true });

export default storePromise