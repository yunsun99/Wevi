pipeline {
    agent any

    environment {
        BRANCH_NAME = "${GIT_BRANCH}"
        NODE_VERSION = 'node20'
        DEPLOY_PATH = '/home/ubuntu/nginx/html'
        JAVA_VERSION = 'jdk17'
        APP_NAME = 'jenkins-test'
        DOCKER_IMAGE = 'jenkins-test:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    echo "현재 브랜치: ${BRANCH_NAME}"
                }
            }
        }

        stage('Backend Build & Deploy') {
            when {
                expression { BRANCH_NAME == 'origin/back' }
            }
            tools {
                jdk "${JAVA_VERSION}"
            }
            steps {
                dir('backend') {
                    script {
                        sh '''
                            echo "===== Build Environment ====="
                            echo "JDK Version:"
                            java --version
                            echo "Docker Version:"
                            docker --version
                            echo "Current Directory:"
                            pwd
                            ls -la
                        '''

                        // Prepare Environment
                        sh '''
                            rm -rf src/main/resources
                            mkdir -p src/main/resources
                            chmod 777 src/main/resources
                        '''

                        // 시크릿 파일 설정 부분 (필요시 주석 해제)
                        withCredentials([
                            file(credentialsId: 'prod-yaml', variable: 'prodFile'),
                            file(credentialsId: 'firebase-json', variable: 'fireFile')
                            // file(credentialsId: 'secret-yaml', variable: 'secretFile')
                        ]) {
                        sh '''
                            cp "$prodFile" src/main/resources/application-prod.yml
                            cp "$fireFile" src/main/resources/firebase-service-account.json
                            chmod 644 src/main/resources/application-*.yml
                            chmod 644 src/main/resources/firebase-*.json
                        '''
                        }
                        
                        // cp "$secretFile" src/main/resources/application-secret.yml
                        // Gradle 빌드
                        sh '''
                            chmod +x gradlew
                            ./gradlew clean build -x test --no-daemon
                        '''
                        
                        // Docker 배포!
                        sh '''
                            docker rm -f ${APP_NAME} || true
                            docker rmi ${DOCKER_IMAGE} || true
                            docker build -t ${DOCKER_IMAGE} .
                            docker run -d \
                                --name ${APP_NAME} \
                                -e SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE=50MB \
                                -e SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE=100MB \
                                --network my-network \
                                --restart unless-stopped \
                                -p 8080:8080 \
                                ${DOCKER_IMAGE}
                        '''
                    }
                }
            }
            post {
                success {
                    echo '백엔드 빌드 및 배포 성공'
                }
                failure {
                    echo '백엔드 빌드 및 배포 실패'
                }
            }
        }

        stage('Frontend Build & Deploy') {
            when {
                expression { BRANCH_NAME == 'origin/front' }
            }
            tools {
                nodejs "${NODE_VERSION}"
            }
            steps {
                dir('frontend') {
                    script {
                        sh '''
                            echo "===== Build Environment ====="
                            echo "Node Version:"
                            node --version
                            echo "NPM Version:"
                            npm --version
                            echo "Current Directory:"
                            pwd
                            ls -la
                        '''

                        sh '''
                            echo "===== Starting Build Process ====="
                            rm -rf node_modules
                            npm install
                            CI=false npm run build
                        '''
                        
                        sh '''
                            echo "===== Starting Deployment ====="
                            echo "Cleaning deployment directory..."
                            rm -rf ${DEPLOY_PATH}/*
                            
                            echo "Copying build files..."
                            cp -r dist/* ${DEPLOY_PATH}/
                            
                            echo "Verifying deployment..."
                            ls -la ${DEPLOY_PATH}
                        '''
                    }
                }
            }
            post {
                success {
                    echo '프론트엔드 빌드 및 배포 성공'
                }
                failure {
                    echo '프론트엔드 빌드 및 배포 실패'
                }
            }
        }
    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                withCredentials([string(credentialsId: 'mattermost-webhook', variable: 'WEBHOOK_URL')]) {
                    mattermostSend(color: 'good',
                        message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                        endpoint: WEBHOOK_URL,
                        channel: 'f1f632e18102627b0737ddbefcf0c505'
                    )
                }
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                withCredentials([string(credentialsId: 'mattermost-webhook', variable: 'WEBHOOK_URL')]) {
                    mattermostSend(color: 'danger',
                        message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                        endpoint: WEBHOOK_URL,
                        channel: 'f1f632e18102627b0737ddbefcf0c505'
                    )
                }
            }
        }
    }
}