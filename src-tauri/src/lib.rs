use base64::Engine;
use reqwest::{Client, Method};
use serde_json::Value;
use tauri::async_runtime;
use tauri_plugin_http::reqwest;

#[tauri::command]
fn send_request(
    endpoint: &str,
    method: &str,
    json_payload: &str,
    mtls_cert_b64: &str,
    mtls_key_b64: &str,
    username: Option<String>,
    password: Option<String>,
) -> Result<Value, String> {
    // Use block_on to run the async function in a blocking context
    async_runtime::block_on(async {
        // Decode base64 mTLS cert and key
        let cert = base64::prelude::BASE64_STANDARD
            .decode(mtls_cert_b64)
            .map_err(|e| e.to_string())?;
        let key = base64::prelude::BASE64_STANDARD
            .decode(mtls_key_b64)
            .map_err(|e| e.to_string())?;
        // Build client with mTLS certificate and key
        let client = Client::builder()
            .identity(
                reqwest::Identity::from_pem(&[cert, key].concat()).map_err(|e| e.to_string())?,
            )
            .build()
            .map_err(|e| e.to_string())?;

        let http_method = match method.to_uppercase().as_str() {
            "GET" => Method::GET,
            "POST" => Method::POST,
            "PUT" => Method::PUT,
            "DELETE" => Method::DELETE,
            _ => {
                return Err("Invalid HTTP method".into());
            }
        };

        // Add basic auth if username and password are provided
        let mut request_builder = client.request(http_method.clone(), endpoint);

        if let (Some(username), Some(password)) = (username, password) {
            request_builder = request_builder.basic_auth(username, Some(password));
        }

        // If the method is not GET, include the JSON payload
        if http_method != Method::GET {
            let payload: Value = serde_json::from_str(json_payload).map_err(|e| e.to_string())?;
            request_builder = request_builder.json(&payload);
        }

        // Send the request
        let response = request_builder.send().await.map_err(|e| e.to_string())?;

        // Parse the JSON response
        let json_response = response.json::<Value>().await.map_err(|e| e.to_string())?;
        Ok(json_response)
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![send_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
