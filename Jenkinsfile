pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') // Jenkins credentials ID for DockerHub
        DOCKER_IMAGE_NAME = 'afreux/devopsproject' // Docker image name without tag
        BUILD_TAG = "${env.BUILD_NUMBER}" // Jenkins build number for tagging
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/AFREUX/devopsproject.git'
            }
        }

        stage('Build docker image') {
            steps {
                script {
                    bat """
                    dir C:\\Users\\user\\Desktop\\project
                    docker build -f C:\\Users\\user\\Desktop\\project\\Dockerfile -t ${DOCKER_IMAGE_NAME}:${BUILD_TAG} -t ${DOCKER_IMAGE_NAME}:latest C:\\Users\\user\\Desktop\\project
                    """
                }
            }
        }

        stage('Push docker image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    script {
                        bat """
                        echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
                        docker push ${DOCKER_IMAGE_NAME}:${BUILD_TAG}
                        docker push ${DOCKER_IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'kubectl test .... '
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
