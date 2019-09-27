def helpers = new ch.softozor.pipeline.Helpers()

pipeline {
  agent any
  environment {
    DOCKER_CREDENTIALS = credentials('docker-credentials')
  }
  stages {
    stage('Build and publish docker image') {
      steps {
        script {
          echo "REPO = $REPO"
          echo "BRANCH = $BRANCH"
          echo "GRAPHQL_API = $GRAPHQL_API"
          echo "ENABLE_DEV_TOOLS = $ENABLE_DEV_TOOLS"
          echo "IMAGE_TYPE = $IMAGE_TYPE"
          helpers.publishDockerImage(REPO, BRANCH, GRAPHQL_API, ENABLE_DEV_TOOLS, IMAGE_TYPE)
        }
      }
    }
  }
}