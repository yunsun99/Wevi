FROM openjdk:17-jdk

ARG JAR_FILE=build/libs/*.jar
# jar 파일 복제
COPY ${JAR_FILE} app.jar

# 실행 명령어 test
ENTRYPOINT ["java", "-Dspring.profiles.active=prod,secret", "-jar", "app.jar"]