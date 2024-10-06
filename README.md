# API for retrieving the contract address from transaction

## Installation

```bash
bun install
```

## Update API logic

Entrypoint: `src/api/app.ts`

## Local Development

To run as a local API server, run

```bash
bun dev
```

## Deployment

To deploy to AWS lambda:

1. CORs: update `ALLOWED_DOMAINS` in `src/utils/cors.ts`.
2. Create new lambda function with `Node.js 20.x` as the Runtime and your desired function name.
3. Update `FUNCTION_NAME` in `package.json`'s `scripts.update`.
4. Update `PROFILE` in `package.json`'s `scripts.update` to use a non-default profile.
5. Run
   ```bash
   bun aws
   ```
