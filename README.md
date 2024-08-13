# AlgoApex - Online Judge Platform

AlgoApex is a project aimed at providing a basic environment for coding practice and problem-solving. It offers essential features for users to engage in competitive programming and manage coding problems efficiently.

## Features
- **User Management**: Register, log in, and manage user profiles with ease. Update profile information and maintain a personalized experience.
- **Problem Dashboard**: Browse and create coding problems with detailed descriptions and specifications.
- **Submission System**: Submit and run code with immediate feedback on various verdicts, including Time Limit Exceeded (TLE), Wrong Answer, Compilation Error, and Accepted.
- **Dockerized Compiler**: Execute code submissions in a secure and isolated Docker environment, ensuring consistency and reliability across different programming languages.
- **Problem Details Page**: View detailed problem descriptions, input/output examples, and interact with an integrated code editor.

## Website
For more information and to try out AlgoApex, visit our website: [AlgoApex Website](https://www.algoapex.online)
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
    
