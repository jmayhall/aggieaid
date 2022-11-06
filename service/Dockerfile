FROM maven:3.8.3-openjdk-17 as build

COPY ./pom.xml ./pom.xml

COPY ./src ./src

RUN mvn clean package -U -DskipTests help:active-profiles


FROM openjdk:17.0.1-jdk-slim

ENV ACTIVE_PROFILES production

COPY --from=build /target/aggieaid-*.jar /aggieaid.jar

EXPOSE 8080

CMD ["java", "-jar", "aggieaid.jar"]