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
        script {
            // Print a message indicating the deployment process is starting
            echo 'Deploying to Kubernetes...'

            // Apply the Kubernetes configuration
            bat """
            kubectl apply -f C:\\Users\\user\\Desktop\\project\\k8s.yaml
            kubectl rollout status deployment/my-app
            """  // Replace with the path to your YAML file

            
        }
    }
}
    }

    post {
        always {
            cleanWs()
        }
    }
}
