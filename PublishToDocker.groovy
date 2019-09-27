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
          helpers.publishFrontendDockerImage(REPO, BRANCH, GRAPHQL_API, ENABLE_DEV_TOOLS, IMAGE_TYPE)
        }
      }
    }
  }
}