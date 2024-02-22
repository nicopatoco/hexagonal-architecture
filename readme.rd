# My Express TypeScript Project

This project is a basic setup for an Express application using TypeScript, with ESLint for linting and Prettier for code formatting.

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- docker
- Node.js
- yarn

Only for testing
- create a file in your root directory 
    - testSetup.js
        process.env.JWT_SECRET = 'your_test_secret';

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd my-express-ts-app```

## install dependencies

```bash
yarn install
```

```bash
docker-compose up -d
```

## Build the TypeScript project

```bash
yarn build
```

## Run the application

```bash
yarn start
```

## For development, to automatically restart the server on file changes

```bash
yarn dev
```

## Lint your code

```bash
yarn lint
```

## Automatically fix linting errors

```bash
yarn lint:fix```

## Format your code with Prettier

```bash
yarn format```

## Project Structure

src/: Source directory for TypeScript files.
dist/: Compiled JavaScript files output by TypeScript.
.eslintrc.json: ESLint configuration file.
.prettierrc: Prettier configuration file.
tsconfig.json: TypeScript compiler options.


my-express-ts-app/
├── src/
│   ├── application/
│   │   ├── ports/
│   │   │   ├── UserRepositoryPort.ts // Port interface for user repository
│   │   │   └── AuthenticationServicePort.ts // Port for authentication logic
│   │   ├── services/
│   │   │   └── AuthenticationService.ts // Implements AuthenticationServicePort
│   ├── domain/
│   │   ├── models/
│   │   │   └── User.ts // Domain model for a user
│   │   ├── errors/
│   │   │   └── DomainError.ts // Custom domain errors
│   │   └── services/
│   │       └── PasswordService.ts // Domain service for password handling (hash, compare, etc.)
│   ├── infrastructure/
│   │   ├── config/
│   │   │   └── index.ts // Application configuration (e.g., database config)
│   │   ├── adapters/
│   │   │   ├── web/
│   │   │   │   ├── server.ts // Setup Express server
│   │   │   │   └── routes/
│   │   │   │       └── userRoutes.ts // Express routes for user-related actions
│   │   │   ├── repositories/
│   │   │   │   └── UserRepository.ts // Adapter for the user repository, implements UserRepositoryPort
│   │   │   └── security/
│   │   │       └── PasswordHasher.ts // Adapter for password hashing, used by PasswordService
│   ├── index.ts // Main application entry point
├── package.json
├── tsconfig.json
├── .eslintrc.json
└── .prettierrc
