# AlgoApex - Online Judge Platform

AlgoApex is a project aimed at providing a basic environment for coding practice and problem-solving. It offers essential features for users to engage in competitive programming and manage coding problems efficiently.

## Table of Contents
<details>
<summary>Click to expand</summary>

- [Features](#features)
- [Website](#website)
- [Built With](#built-with)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)

</details>

## Features

- **User Management**: Register, log in, and manage user profiles with ease. Update profile information and maintain a personalized experience.
- **Problem Dashboard**: Browse and create coding problems with detailed descriptions and specifications.
- **Submission System**: Submit and run code with immediate feedback on various verdicts, including Time Limit Exceeded (TLE), Wrong Answer, Compilation Error, and Accepted.
- **Dockerized Compiler**: Execute code submissions in a secure and isolated Docker environment, ensuring consistency and reliability across different programming languages.
- **Problem Details Page**: View detailed problem descriptions, input/output examples, and interact with an integrated code editor.

## Website

For more information and to try out AlgoApex, visit my website: [AlgoApex Website](https://www.algoapex.online)

## Built With

The project is based on the MERN stack with the help of additional tools such as Docker, AWS, and Vercel.

- [**Node.js**](https://nodejs.org)
- [**React**](https://reactjs.org)
- [**Express**](https://expressjs.com)
- [**MongoDB**](https://www.mongodb.com)
- [**Docker**](https://www.docker.com)
- [**AWS**](https://aws.amazon.com)
- [**Vercel**](https://vercel.com)

## Prerequisites

Before running the project, ensure you have the following installed:

- **Docker Desktop**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
- **npm**: Install the latest version globally using:
    ```bash
    npm install npm@latest -g
    ```

## Getting Started

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/AdityaAbhilash/Online-Judge.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd algoapex
    ```

3. **Backend**:
    ```bash
    cd backend
    npm install
    npm install docker
    docker build -t algoapex-backend .
    docker run -p 8000:8000 algoapex-backend
    ```

4. **Frontend**:
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```
## Roadmap

- [x] **Frontend**: Developed the user interface and user experience components.
- [x] **Compiler**: Integrated a code compiler for running and submitting code.
- [x] **Verdicts**: Provide feedback on code submissions (e.g., TLE, Compilation error, Wrong Answer, Accepted).
- [x] **Docker**: Containerize the application for consistent environments.
- [x] **AWS Deployment**: Deploy the application on AWS for production.
- [x] **Multi-language Support**: Support multiple programming languages for code submissions (C++,C,Java,Python).
- [x] **Email Verification**: Implement email verification for user accounts.
- [x] **Mobile Optimization**: Ensure the platform is responsive and usable on mobile devices.
- [ ] **Editorial and Discussion Page**: Add pages for problem discussions and editorial content.
- [ ] **Live Contests**: Implement coding contests feature.
- [ ] **Search and Filter**: Enhance the problem dashboard with search and filtering capabilities.

[Back to Top](#table-of-contents)
