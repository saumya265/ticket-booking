name: Node.js CI

on:
  push:
    branches: [ main ]  # Trigger on push to the main branch
  pull_request:
    branches: [ main ]  # Trigger on pull requests to the main branch

jobs:
  test:
    runs-on: ubuntu-latest  # Use the latest Ubuntu environment

    steps:
      # Step 1: Check out the repository
      - name: Checkout code
        uses: actions/checkout@v2

      # Step 2: Set up Node.js
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'  # Specify the Node.js version

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm install

      # Step 4: Run tests
      - name: Run tests
        run: npm test
