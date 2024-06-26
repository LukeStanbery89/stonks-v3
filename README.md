[![Unit Tests](https://github.com/LukeStanbery89/stonks-v3/actions/workflows/node.js.yml/badge.svg)](https://github.com/LukeStanbery89/stonks-v3/actions/workflows/node.js.yml)
[![Dependency Review](https://github.com/LukeStanbery89/stonks-v3/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/LukeStanbery89/stonks-v3/actions/workflows/dependency-review.yml)
[![CodeQL](https://github.com/LukeStanbery89/stonks-v3/actions/workflows/codeql.yml/badge.svg)](https://github.com/LukeStanbery89/stonks-v3/actions/workflows/codeql.yml)

# Stonks

Stonks is an auto-trading cryptocurrency application that allows you to trade cryptocurrencies using customizable strategies and swappable brokerage APIs. It provides a simulation mode for analyzing the effectiveness of various trading strategies.

## Features

- Swappable brokerage APIs: Easily connect to different brokerage APIs for executing trades.
- Customizable trading strategies: Define and customize trading strategies to suit your needs.
- Simulation mode: Analyze the effectiveness of different trading strategies without actually executing real trades.

## Installation

To get started with Stonks v3, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/LukeStanbery89/stonks-v3.git
   cd stonks-v3
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

Stonks v3 provides the following npm scripts for different purposes:

- `build`: Build the server and client code in production mode.
- `build:client`: Build the client code.
- `build:server`: Build the server code.
- `db:create-tables`: Creates the database tables.
- `dev`: Start the client and backend development servers.
- `dev:client`: Start the client development server.
- `dev:server:watch`: Watch for changes to the backend development server.
- `dev:server:serve`: Serve the backend development server.
- `lint`: Run ESLint to check for lint errors.
- `lint:fix`: Run ESLint and automatically fix lint errors.
- `start`: Start the application.
- `test`: Run all tests.
- `test:client`: Run client-side tests.
- `test:server`: Run server-side tests.

To use these scripts, you can run them using npm. For example:

```bash
# Build the client and server code in production mode
npm run build

# Start the development server
npm run dev

# Run ESLint to check for lint errors
npm run lint

# Run all tests
npm test
``````

## License

[MIT License](LICENSE)
```

Feel free to customize and expand the content as needed. Replace `<repository-url>` with the actual URL of your repository.

Make sure to update the `Installation` section to include any additional steps specific to your project setup.

Let me know if you need any further assistance!
