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
                        echo "Listing workspace directory:"
                        ls -l ${WORKSPACE}
                        echo "Building Docker image..."
                        docker build -f ${WORKSPACE}/Dockerfile -t ${DOCKER_IMAGE_NAME}:${BUILD_TAG} -t ${DOCKER_IMAGE_NAME}:latest ${WORKSPACE}
                    """
                }
            }
        }

        stage('Push docker image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    script {
                        sh """
                        echo \$PASSWORD | docker login -u \$USERNAME --password-stdin
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
                    withCredentials([file(credentialsId: 'k3s-kubeconfig', variable: 'KUBECONFIG')]) {
                        sh """
                            export KUBECONFIG=${KUBECONFIG}
                            echo 'Deploying to Kubernetes...'
                            kubectl apply -f ${WORKSPACE}/k8s.yaml
                            DEPLOYMENT_NAME=\$(kubectl get deployments -o jsonpath='{.items[0].metadata.name}')
                            kubectl rollout restart deployment/\$DEPLOYMENT_NAME
                            kubectl rollout status deployment/\$DEPLOYMENT_NAME
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            echo "Pipeline failed! Check the logs for details."
        }
        success {
            echo "Pipeline succeeded! Application deployed successfully."
        }
    }
}