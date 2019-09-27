pipeline {
  agent any
  environment {
    DOCKER_CREDENTIALS = credentials('docker-credentials')
    DOCKER_REPO = "softozor/shopozor-$REPO:$IMAGE_TYPE-$BRANCH"
  }
  stages {
    stage('Build docker image') {
      steps {
        script {
            sh "cp $IMAGE_TYPE/Dockerfile ."
            sh "cp $IMAGE_TYPE/.dockerignore ."
            sh "docker login -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW"
            sh "docker build --build-arg GRAPHQL_API=$GRAPHQL_API --build-arg ENABLE_DEV_TOOLS=$ENABLE_DEV_TOOLS --network=host -t $DOCKER_REPO ."
        }
      }
    }
    stage('Publish docker image') {
      steps {
        script {
            sh "docker push $DOCKER_REPO"
        }
      }
    }
  }
}