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
                    dir C:\\Users\\user\\Desktop\\project
                    docker build -f C:\\Users\\user\\Desktop\\project\\Dockerfile -t $DOCKER_IMAGE C:\\Users\\user\\Desktop\\project
                    """
                }
            }
        }
        
        stage('push docker image') {
             steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                script {
                bat """
                echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
                docker push $DOCKER_IMAGE
                """
            }
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
