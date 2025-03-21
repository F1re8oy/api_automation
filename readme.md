# Project Overview

Simple API test automation framework for practice 

## Tech Stack

**Libraries:**
- **chai:** A BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
- **mocha:** A feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple.
- **supertest:** A SuperAgent driven library for testing HTTP servers.
- **get-nested-value:** Utility to retrieve nested values safely from an object.
- **mochawesome:** A custom reporter for use with the Mocha JS testing framework. It generates a full HTML/CSS report that helps visualize your test runs.

**Requirements:**
- **Node.js (min version 14):** Our project requires at least version 14 of Node.js due to specific features and stability improvements introduced in this version. Visit [Node.js](https://nodejs.org) for installation or upgrade instructions.

## Installation

To set up the project environment on your local machine, follow the instructions below:

```bash
npm install
```

This command installs all the necessary dependencies for the project, ensuring that you have everything you need to get started.


## Running Tests

To execute the tests, use the command format below. Both the test set name and environment are mandatory parameters:

```bash
npm run <testSetName> <env>
```

- **testSetName:** - mandatory parameter, the name of the test set you want to run. Currently supported test sets include - user
- **env:** -  mandatory parameter, specifies the environment where the tests will be run. Options include - STG

## Execution Report

After running your tests, the execution report is generated and can be found at:
```bash
/mochawesome-report/mochawesome.html
```

This report provides a detailed overview of your test runs, including successful tests and any failures with their causes, helping you quickly identify and address any issues