# Base image
FROM saschpe/android-ndk:35-jdk22.0.2_9-ndk27.0.12077973-cmake3.22.1
RUN sdkmanager --install emulator

# Update and install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget curl git unzip zip build-essential libssl-dev pkg-config \
    openjdk-11-jdk-headless && \
    rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

# Install Node.js (LTS) and npm
RUN curl -L https://bit.ly/n-install | bash -s -- -y


WORKDIR /workspace

COPY . .

# Default command
CMD ["/bin/bash"]
