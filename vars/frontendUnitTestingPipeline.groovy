def call() {
  def helpers
  pipeline {
    agent any
    environment {
      REPORTS_FOLDER = 'junit-reports'    
    }
    stages {
      stage('Load helpers') {
        steps {
          script {
            helpers = new ch.softozor.pipeline.Helpers()
          }
        }
      }
      stage('Node Modules Installation') {
        steps {
          sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache yarn"
        }
      }
      stage('Building application') {
        environment {
          GRAPHQL_API = 'http://localhost:8000/graphql/'
        }
        steps {
          sh "yarn build"
        }
      }
      stage('Performing unit tests') {
        steps {
          helpers.deleteFolder(REPORTS_FOLDER)
          sh "yarn test:unit:ci"
        }
      }
    }
    post {
      always {
        junit "**/$REPORTS_FOLDER/*.xml"
      }
    }
  }
}