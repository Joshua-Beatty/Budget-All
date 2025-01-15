# Budget All

Budget All is an envelope-based budgeting application that helps you manage your finances efficiently. With this app, you can:
- Set up and manage your envelopes.
- Automatically load transactions using the Teller API, which connects to various bank providers.

This project is built with Tauri, React, and TypeScript, and is designed for Android.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
  - Install the [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) for better development experience.
  - Install [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) for Rust language support.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Rust](https://www.rust-lang.org/tools/install) and Cargo
- [Android Studio](https://developer.android.com/studio) with:
  - Android SDK
  - NDK (Native Development Kit)
  - Platform Tools
  - Build Tools
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (version 8 or higher)
- [Teller API](https://teller.io/) credentials

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/budget-all.git
   cd budget-all
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run tauri dev
   ```

## Building for Android

1. Configure the Android environment:
   - Ensure Android Studio is installed and properly set up.
   - Connect a physical Android device or start an emulator.

2. Build the app:
   ```bash
   npm run tauri android dev
   ```

3. Generate a production-ready APK:
   ```bash
   npm run tauri android build
   ```

The APK file will be available in the `src-tauri/target/android/release` directory.

## Contributing

We welcome contributions! Please feel free to submit issues or pull requests to improve Budget All.

## License

This project is licensed under the [MIT License](LICENSE).

