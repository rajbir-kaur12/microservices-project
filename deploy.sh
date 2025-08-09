#!/bin/bash
kubectl apply -f k8s/configmaps.yaml
kubectl apply -f k8s/secrets.yaml
kubectl set image deployment/user-service user-service=rajbirkaur12/user-service:latest
kubectl set image deployment/product-service product-service=rajbirkaur12/product-service:latest
