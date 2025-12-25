---
description: Deploy the application to a local Kubernetes cluster
---

# Deploy to Kubernetes

This workflow guides you through deploying the microservices platform to a local Kubernetes cluster (like Minikube, Docker Desktop, or Kind).

## Prerequisites
- A running Kubernetes cluster (Minikube, Docker Desktop, or Kind).
- `kubectl` installed and configured.
- Docker installed.

## Steps

### 1. Build Images
Ensure all docker images are built locally.

```bash
docker compose build
```

### 2. Prepare Environment (Minikube Only)
If you are using Minikube, you need to point your shell to Minikube's Docker daemon so it can find the images you built.

```bash
# Run this in your terminal
eval $(minikube docker-env)
# Re-build images inside Minikube
docker compose build
```
*Skip this step if using Docker Desktop Kubernetes.*

### 3. Deploy to Kubernetes
Apply all manifests in the `k8s` directory.

// turbo-all
```bash
kubectl apply -f k8s/
```

### 4. Verify Deployment
Check if all pods are running.

```bash
kubectl get pods
```

### 5. Access Application
- **Frontend**: http://localhost:30000 (NodePort)
- **API Gateway**: http://localhost:30080 (NodePort)

If using Minikube, you might need to run:
```bash
minikube service client-app --url
minikube service api-gateway --url
```
