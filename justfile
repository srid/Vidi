# Vidi — justfile

# List available targets
default:
    @just --list

# Install dependencies
install:
    npm install

# Start dev server
dev:
    npm run dev

# Build for production
build:
    npm run build

# Preview production build
preview:
    npm run build && npm run preview

# Clean build artifacts
clean:
    rm -rf dist node_modules
