def call() {
  def helpers
  pipeline {
    agent any
    parameters {
      booleanParam(name: 'DELETE_FRONTEND', defaultValue: true, description: 'Disable this value if you need to get feedback about the frontend status after the test')
    }
    environment {  
      BACKEND_NAME = credentials('backend-name-credentials') // contains envName + e2e jps url
      FRONTEND_NAME = credentials('mgmt-frontend-name-credentials') // contains envName
      JELASTIC_APP_CREDENTIALS = credentials('jelastic-app-credentials')
      JELASTIC_CREDENTIALS = credentials('jelastic-credentials')
      PATH_TO_TEST_RESULTS = '/home/node'
      SCREENSHOTS_FOLDER = 'screenshots'
      TEST_REPORTS_FOLDER = 'junit-reports'
      VIDEOS_FOLDER = 'videos'
    }
    stages {
      stage('Load helpers') {
        steps {
          script {
            helpers = new ch.softozor.pipeline.Helpers()
          }
        }
      }
      stage('Starting up backend environment') {
        environment {
          GITHUB_CREDENTIALS = credentials('github-credentials')
          BACKEND_JPS = 'backend.jps'
        }
        steps {
          script {
            helpers.prepareBackendConfiguration(GITHUB_CREDENTIALS_USR, GITHUB_CREDENTIALS_PSW, 'dev', BACKEND_JPS, BACKEND_NAME_PSW)
            helpers.deploy(BACKEND_JPS, BACKEND_NAME_USR)
          }
        }
      }
      stage('Building frontend app') {
        environment {
          GRAPHQL_API = "http://${BACKEND_NAME_USR}.hidora.com/graphql/"
        }
        steps {
          sh "yarn && yarn build"
        }
      }
      stage('Starting up frontend and performing end-to-end tests') {
        environment {
          DOCKER_CREDENTIALS = credentials('docker-credentials')
          DOCKER_REPO = "softozor/${FRONTEND_NAME}"
          FRONTEND_JPS = './common/e2e/manifest.jps'
        }
        steps {
          script {
            // helpers.buildDockerImage()
            echo "DOCKER IMAGE BUILD TEMPORARILY DISABLED"
            helpers.deploy(FRONTEND_JPS, FRONTEND_NAME)
          }
        }
      }
      stage('Retrieving test results from frontend environment') {
        steps {
          script {
            def targetNodeGroup = 'cp'
            def targetPath = '/mnt'
            def sourceNodeGroup = 'cp'
            def jenkinsEnvName = JENKINS_URL.split('/')[2].split(':')[0].split('\\.')[0]
            helpers.retrieveTestResults(jenkinsEnvName, targetNodeGroup, targetPath, FRONTEND_NAME, sourceNodeGroup)
          }
        }
      }
    }
    post {
      always {
        script {
          // the environment deletion will trigger a reinstall next time
          // a frontend reinstall is required because at the end of the manifest's installation, we know that the tests are done
          if(params.DELETE_FRONTEND == true) {
            helpers.deleteEnvironment(FRONTEND_NAME)
          }
          helpers.stopEnvironment(BACKEND_NAME_USR)
          helpers.buildArtifacts()
        }
      }
    }
  }
}
return this