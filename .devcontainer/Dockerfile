FROM cimg/rust:1.67.0

# See: https://tauri.app/v1/guides/getting-started/prerequisites/#setting-up-linux
ARG TAURI_BUILD_DEPS="libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev"

RUN sudo apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && sudo apt-get install -y --no-install-recommends $TAURI_BUILD_DEPS

RUN sudo chsh -s /usr/bin/bash circleci