# Kamal Configuration

This directory contains the Kamal configuration for deploying the M324 Gruppenarbeit application to AWS EC2.

## What is Kamal?

Kamal offers zero-downtime deploys, rolling restarts, asset bridging, remote builds, accessory service management, and everything else you need to deploy and manage your web app in production with Docker. Originally built for Rails apps, Kamal will work with any type of web app that can be containerized.

## Files

- `config/deploy.yml` - Main Kamal configuration file
- `env.example` - Example environment variables file

## Setup

1. Copy `env.example` to `.env` and fill in your actual values:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` with your specific configuration:
   - `KAMAL_SERVER_IP`: Your EC2 instance IP address
   - `KAMAL_REGISTRY_USERNAME`: Your Docker Hub username
   - `KAMAL_REGISTRY_PASSWORD`: Your Docker Hub password or access token

## Usage

The Kamal deployment is typically handled by GitHub Actions, but you can also run it locally:

### Prerequisites
- Ruby installed on your machine
- Kamal gem installed: `gem install kamal`
- SSH access to your EC2 instance
- Docker registry credentials

### Commands

- `kamal setup` - Initial setup and deployment
- `kamal deploy` - Deploy new version
- `kamal app logs` - View application logs
- `kamal app containers` - List running containers
- `kamal rollback VERSION` - Rollback to previous version

## What kamal setup does:

1. Connects to the server via SSH
2. Installs docker and curl on the server if not already present
3. Logs into the Docker Registry
4. Builds the Dockerfile
5. Pushes the Docker image from local to the registry
6. Pulls the Docker image on the server from the Docker registry
7. Loads all environment variables from .env to the server
8. Ensures that Traefik (a load balancer) runs on port 80
9. Connects the app in the Docker image via Traefik using a healthcheck on path /up
10. Starts a new container with the new Docker image
11. Stops the old container, if present, as soon as the new image is running
12. Deletes old containers

This provides zero-downtime deployment capabilities!

## GitHub Actions Integration

The deployment is automated through GitHub Actions. The workflow "Setup Infrastructure on Amazon AWS" includes a job "Bootstrap Kamal on AWS EC2 instance" that handles the Kamal deployment process.
