#To create a base image of the RESTful API
FROM openjdk:22-slim

#location of the JAR file
ARG JAR_FILE=target/*.jar

#Copy the JAR file
COPY ./target/codesculpt-0.0.1-SNAPSHOT.jar app.jar

#Set ENTRYPOINT in exec form to run the container as an executable
ENTRYPOINT ["java", "-jar", "/app.jar"]

EXPOSE 8080