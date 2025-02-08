pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') // Jenkins credentials ID for DockerHub
        DOCKER_IMAGE = 'afreux/devopsproject:latest' // Change to your Docker image name
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
                    docker build -t $DOCKER_IMAGE .
                    """
                }
            }
        }
        
        stage('push docker image') {
            steps {
                 script {
                 bat """
                    echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                    docker push $DOCKER_IMAGE
                    """
                 }
            }
        }
        stage('Deploy'){
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
