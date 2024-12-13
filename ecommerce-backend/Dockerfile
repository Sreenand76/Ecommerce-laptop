FROM openjdk:21
WORKDIR /app

# Copy the correct JAR file from target directory
COPY target/quizApp-0.0.1-SNAPSHOT.jar /app/ecommerce-backend-0.0.1-SNAPSHOT.jar

EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/ecommerce-backend-0.0.1-SNAPSHOT.jar"]