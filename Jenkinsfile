pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    echo 'Building Docker image...'
                    bat 'docker build -t my-node-app .'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    bat 'npm test'

                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Skipping Kubernetes deployment for now...'
                    // Replace with 'sh kubectl apply -f k8s-deployment.yaml' when ready
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
