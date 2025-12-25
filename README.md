# Cloud-Based Insurance/FinTech Microservices Platform

A production-ready microservices architecture for an Insurance/FinTech application built with MERN stack, Docker, Kubernetes, and NGINX.

## 🚀 Features

- **Microservices Architecture**: Separate services for Auth, Policy, Claims, and Payments.
- **API Gateway**: NGINX acting as a single entry point and reverse proxy.
- **Containerization**: Fully Dockerized services for consistent deployment.
- **Orchestration**: Kubernetes manifests for production and Docker Compose for local development.
- **Security**: JWT-based authentication, Role-Based Access Control (Admin/User), and secured APIs.
- **Frontend**: Modern React app with Tailwind CSS and role-specific dashboards.

## 🛠 Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React (Vite), Tailwind CSS
- **Infrastructure**: Docker, Kubernetes, NGINX
- **CI/CD**: GitHub Actions

## 📂 Architecture Overview

| Service | Port | Description |
|---------|------|-------------|
| **API Gateway** | 8080 (Local), 80 (K8s) | Routes requests to backend services |
| **Auth Service** | 5001 | User registration, login, JWT issuance |
| **Policy Service** | 5002 | CRM for insurance policies |
| **Claims Service** | 5003 | Claims processing and status tracking |
| **Payment Service** | 5004 | Mock payment processing |
| **Frontend** | 5173 (Dev), 80 (Prod) | User interfaces |

## 🏁 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (for local dev)
- Kubernetes Cluster (Minikube/Kind) - Optional

### 🐳 Local Deployment (Docker Compose)

The easiest way to run the entire system:

```bash
docker-compose up --build
```

Access the application:
- **Frontend**: [http://localhost:3000](http://localhost:3000) (or whichever port Docker maps, usually 3000 or 5173 if running dev)
- **API Gateway**: [http://localhost:8080](http://localhost:8080)

### ☸️ Kubernetes Deployment

To deploy to a K8s cluster:

```bash
kubectl apply -f k8s/
```

Access services via LoadBalancer IPs or NodePorts:
- **Frontend**: NodePort 30000
- **API Gateway**: NodePort 30080

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Policies
- `GET /api/policies` - List policies
- `POST /api/policies` - Create policy (Admin)

### Claims
- `GET /api/claims` - List claims
- `POST /api/claims` - File claim

### Payments
- `POST /api/payments` - Make payment

## 🧪 Testing

Run unit tests (where available) or use the GitHub Actions CI pipeline which builds all services on push.

## 📜 License

MIT
