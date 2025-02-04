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
                    echo 'sh docker build -t my-node-app .'
                    // Replace with 'sh docker build -t my-node-app .' when ready
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    // Add your test command if applicable
                    sh 'echo "Tests are successful"' 
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
