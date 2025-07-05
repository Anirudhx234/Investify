# Investify

**Team 15 - CS 307 Project**  
*Anirudh Kaza, Dev Patel, Praveer Sharan, Swastik Agarwala, Vikhyat Jagini*

## Table of Contents

- [🚀 Live Demo](#live-demo)
- [📋 Overview](#overview)
  - [Problem Statement](#problem-statement)
  - [Target Audience](#target-audience)
- [✨ Key Features](#key-features)
  - [🔐 User Management](#user-management)
  - [📊 Asset Discovery & Analysis](#asset-discovery--analysis)
  - [💼 Portfolio Management](#portfolio-management)
  - [🎯 Investment Projections](#investment-projections)
  - [🎮 Gamified Learning](#gamified-learning)
  - [🤖 AI-Powered Advice](#ai-powered-advice)
- [🛠️ Technology Stack](#technology-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [External APIs](#external-apis)
  - [Infrastructure](#infrastructure)
- [📚 API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Asset Endpoints](#asset-endpoints)
  - [Portfolio Endpoints](#portfolio-endpoints)
  - [Game Endpoints](#game-endpoints)
- [🏗️ Project Structure](#project-structure)
- [🔒 Security Features](#security-features)
- [📈 Performance & Scalability](#performance--scalability)
- [🙏 Acknowledgments](#acknowledgments)

## Live Demo

**[View Live Application](http://ec2-3-147-34-145.us-east-2.compute.amazonaws.com/home)**

## Overview

Investify is a comprehensive investment learning and simulation platform designed to make financial education accessible and engaging for beginners and experienced investors alike. The platform combines real-time market data, portfolio management, social features, and gamified learning to create an immersive financial education experience.

### Problem Statement

Learning how to invest can be challenging, especially for beginners unfamiliar with financial markets. Since there's no one-size-fits-all approach and each person's financial situation is unique, Investify helps users explore various investment options including stocks, mutual funds, cryptocurrencies, bonds, and life insurance policies while making the learning process simpler and more accessible.

### Target Audience

- Individuals with little to no experience in financial markets
- Recent graduates and entry-level professionals starting their investment journey
- Students learning about finance who want hands-on experience
- Anyone interested in growing their wealth through informed investment decisions

## Key Features

### User Management
- Secure account creation and authentication
- Profile customization with financial goals and risk tolerance
- Password reset and email verification
- Account deletion and data management

### Asset Discovery & Analysis
- Real-time market data for stocks, ETFs, cryptocurrencies, and mutual funds
- Interactive charts with candlestick and line views
- Moving averages and technical indicators
- Popular assets and market movers tracking
- Comprehensive asset information pages

### Portfolio Management
- Real and paper portfolio creation and management
- Portfolio analytics with risk assessment
- Sector diversification analysis
- ROI calculations and performance tracking
- Asset allocation insights

### Investment Projections
- Interactive projection tools for various asset classes
- Historical performance analysis
- Custom scenario modeling
- Market condition simulations (bull/bear markets, recessions)

### Gamified Learning
- Paper trading competitions with real-time market data
- Public and private trading competitions
- Leaderboards and achievement systems
- Badges and participation rewards
- Friend system and social interactions

### AI-Powered Advice
- Personalized financial advice using Azure OpenAI
- Risk assessment based on user profiles
- Investment recommendations tailored to individual goals

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with persistence
- **Styling**: Tailwind CSS + DaisyUI
- **Charts**: Recharts + Lightweight Charts
- **Forms**: React Hook Form with validation
- **Routing**: Wouter
- **Testing**: Vitest + Testing Library

### Backend
- **Framework**: Spring Boot 3.x with Java
- **Database**: PostgreSQL
- **Authentication**: JWT with Spring Security
- **API Integration**: WebFlux for reactive programming
- **File Storage**: AWS S3
- **AI Services**: Azure OpenAI
- **Email**: Spring Mail with SMTP
- **Caching**: Caffeine
- **Real-time**: WebSocket for live price updates

### External APIs
- **Market Data**: Polygon.io, Alpha Vantage, Twelve Data
- **Cryptocurrency**: CoinMarketCap
- **News**: DuckDuckGo scraping
- **AI**: Azure OpenAI for financial advice

### Infrastructure
- **Hosting**: AWS EC2
- **Database**: PostgreSQL
- **File Storage**: AWS S3
- **Containerization**: Docker with Docker Compose

## API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation

### Asset Endpoints
- `GET /api/assets/stocks/popular` - Popular stocks
- `GET /api/assets/stocks/movers` - Market movers
- `GET /api/assets/crypto/popular` - Popular cryptocurrencies
- `GET /api/assets/{symbol}/price` - Real-time asset price
- `GET /api/assets/{symbol}/chart` - Historical price data

### Portfolio Endpoints
- `GET /api/portfolios` - User portfolios
- `POST /api/portfolios/real` - Create real portfolio
- `POST /api/portfolios/paper` - Create paper portfolio
- `GET /api/portfolios/{id}/analytics` - Portfolio analytics

### Game Endpoints
- `GET /api/games` - Available games
- `POST /api/games` - Create new game
- `POST /api/games/{id}/join` - Join game
- `GET /api/games/{id}/leaderboard` - Game leaderboard

## Project Structure

```
investify/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── forms/          # Form components
│   │   ├── scenes/         # Complex UI scenes
│   │   ├── api/            # API service layers
│   │   ├── features/       # Redux slices
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript definitions
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   └── src/main/java/com/investify/backend/
│       ├── controllers/    # REST controllers
│       ├── services/       # Business logic
│       ├── repositories/   # Data access layer
│       ├── entities/       # JPA entities
│       ├── dtos/           # Data transfer objects
│       ├── config/         # Configuration classes
│       └── mappers/        # Object mapping
└── docker-compose.yml
```

## Security Features

- JWT-based authentication with secure HTTP-only cookies
- Password hashing with BCrypt
- CORS protection with configurable origins
- Rate limiting to prevent DDoS attacks
- Input validation and sanitization
- Secure file upload to AWS S3

## Performance & Scalability

- **Caching**: Caffeine cache for frequently accessed data
- **Async Processing**: WebFlux for non-blocking operations
- **Database Optimization**: Proper indexing and query optimization
- **CDN**: Static assets served via AWS S3
- **Load Balancing**: Ready for horizontal scaling

## Acknowledgments

- **APIs**: Polygon.io, Alpha Vantage, Twelve Data, CoinMarketCap
- **Cloud Services**: AWS (EC2, S3), Azure OpenAI
- **Open Source Libraries**: Spring Boot, React, Redux, Tailwind CSS
- **Team**: Special thanks to all team members for their contributions

---

**Built with ❤️ by Team 15**
