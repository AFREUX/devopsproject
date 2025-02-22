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
                checkout scm
            }
        }

        stage('Build docker image') {
            steps {
                script {
                    sh """
                        docker info
                        ls -l /var/run/docker.sock
                        dir /home/azureuser/jenkins_workspace/devopsproject
                        docker build -f /home/azureuser/jenkins_workspace/devopsproject/Dockerfile -t ${DOCKER_IMAGE_NAME}:${BUILD_TAG} -t ${DOCKER_IMAGE_NAME}:latest /home/azureuser/jenkins_workspace/devopsproject
                    """
                }
            }
        }

        stage('Push docker image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    script {
                        sh """
                        echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin
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
                    echo 'Deploying to Kubernetes i am so far...'

                    // Apply the Kubernetes configuration
                    sh """
                    kubectl apply -f /home/azureuser/jenkins_workspace/devopsproject/k8s.yaml
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
