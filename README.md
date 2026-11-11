# Student Management System

A web-based Student Management System developed using **Java Spring Boot**, **MariaDB**, **Docker**, and **Kubernetes**. The project demonstrates application development, containerisation, database integration, orchestration, and performance testing.

#Technologies Used

- **Java / Spring Boot** – Backend application and REST API
- **MariaDB** – Relational database
- **HTML, CSS, JavaScript** – Frontend
- **Docker** – Application containerisation
- **Docker Compose** – Local multi-container deployment
- **Kubernetes (Minikube)** – Container orchestration and application deployment
- **k6** – Load and performance testing

## Project Structure

```text
student-management-system/
│
├── k6/
│   └── loadtest.js
│
└── student-management-system/
    ├── src/
    │   ├── main/
    │   │   ├── java/          # Backend source code
    │   │   └── resources/     # Application properties and frontend
    │   └── test/              # Application tests
    │
    ├── k6-kubernetes/         # Kubernetes load-testing configuration
    ├── k8s/                   # Kubernetes deployment and service manifests
    ├── .env.example           # Example environment variables
    ├── Dockerfile             # Application container definition
    ├── docker-compose.yml     # Local multi-container configuration
    └── pom.xml                # Maven dependencies and build configuration
```

## Running with Docker Compose

**Prerequisites:** Docker Desktop with Docker Compose.

1. Navigate to the application directory:

   ```bash
   cd student-management-system
   ```

2. Create your local environment file:

   ```bash
   cp .env.example .env
   ```

3. Update the environment variables in `.env` with your local database credentials.

4. Build and start the containers:

   ```bash
   docker compose up --build
   ```

5. Access the application at:

   `http://localhost:8080`

## Kubernetes Deployment

The `k8s/` directory contains the Kubernetes manifests used to deploy the application and MariaDB database to a Minikube cluster.

The configuration includes:

- Application Deployment
- MariaDB Deployment
- Persistent Volume Claim (PVC) for database storage
- Kubernetes Services
- Namespace configuration

The application is exposed through a NodePort service on port **30080**.

**Note:** Kubernetes credentials and secrets are intentionally excluded from this repository. Configure the required Kubernetes Secret before deploying.

## Load Testing

The project includes k6 scripts for performance testing.

- `k6/loadtest.js` – Standalone load-testing script.
- `k6-kubernetes/` – Kubernetes-based k6 Job and load-testing script.

The Kubernetes-based test executes load testing inside the cluster and allows the application's performance to be observed under concurrent user requests.

## Security

Sensitive credentials and environment-specific configuration files are excluded using `.gitignore`. The `.env.example` file provides a template for configuring the application locally.

## Author - I. Chatterjee

Developed as part of a university project.
