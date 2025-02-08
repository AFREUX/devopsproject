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
        stage('Check Docker Info') {
    steps {
        script {
            bat 'docker info'
        }
    }
}
        // stage('Build docker image') {
        //     steps {
        //         script {
        //             bat """
        //             dir C:\\Users\\user\\Desktop\\project
        //             docker build -f C:\\Users\\user\\Desktop\\project\\Dockerfile -t $DOCKER_IMAGE C:\\Users\\user\\Desktop\\project
        //             """
        //         }
        //     }
        // }
        
        // stage('push docker image') {
        //     steps {
        //          script {
        //          bat """
        //             echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
        //             docker push $DOCKER_IMAGE
        //             """
        //          }
        //     }
        // }
        // stage('Deploy'){
        //     steps {
        //         echo 'kubectl test .... '

        //     }
        // }
    }
    post {
        always {
            cleanWs()
        }
    }
}
