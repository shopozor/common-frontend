pipeline {
  agent any
  stages {
    stage('Spec generation') {
      environment {
        SOFTOZOR_CREDENTIALS = credentials('softozor-credentials')
      }
      steps {
        helpers.generateSpecification("$WORKSPACE/cypress/e2e", $REPO, GIT_COMMIT)
      }
    }
  }
}