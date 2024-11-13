use base64::Engine;
use reqwest::{Client, Method};
use tauri_plugin_http::reqwest::{self, Identity};

#[tauri::command(async)]
async fn fetch_with_mtls(
    url: String,          // Endpoint URL
    username: String,     // Username for Basic Auth
    pkcs12_b64: String,   // Base64-encoded PKCS#12 file
    pkcs12_password: String, // Password for the PKCS#12 file
) -> Result<String, String> {
    // Decode the Base64-encoded PKCS#12 file
    let pkcs12_data = base64::prelude::BASE64_STANDARD
        .decode(pkcs12_b64)
        .map_err(|e| format!("Invalid PKCS#12 file: {}", e))?;

    // Create an Identity object from the PKCS#12 archive
    let identity = Identity::from_pkcs12_der(&pkcs12_data, &pkcs12_password)
        .map_err(|e| format!("Failed to create identity from PKCS#12: {:?}", e))?;

    // Create an HTTP client with the mTLS identity
    let client = Client::builder()
        .identity(identity)
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {:?}", e))?;

    // Make the GET request with Basic Auth
    let response = client
        .get(&url)
        .basic_auth(username, Some(""))
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    // Extract the response text
    let response_text = response.text().await.map_err(|e| format!("Failed to read response: {}", e))?;

    // Return the response text
    Ok(response_text)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![fetch_with_mtls])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
