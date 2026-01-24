# POC Rating Service

This is a POC (Proof of Concept) repository for testing auto-remediation capabilities.

## Purpose

This service simulates a rating service that can experience various issues:
- Database connection timeouts
- Validation errors
- Query performance issues
- Service unavailability

## Structure

```
poc-rating-service/
├── src/
│   └── index.js      # Main service code
├── package.json      # Dependencies
└── README.md         # This file
```

## Running

```bash
npm install
npm start
```

## Endpoints

- `POST /api/v1/ratings` - Submit a rating
- `GET /api/v1/ratings/product/:productId` - Get ratings for a product
- `GET /health` - Health check

## Auto-Remediation

This repository is used to test automated incident remediation:
1. When incidents are detected, GitHub issues are created here
2. Issue Agent analyzes the code and proposes fixes
3. PR Review Agent reviews and approves fixes
