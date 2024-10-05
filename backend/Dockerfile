# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17-slim AS builder

# Set the working directory
WORKDIR /app

# Copy the pom.xml and the source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar ./investify.jar

# Expose port 8080 for the app
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "investify.jar"]