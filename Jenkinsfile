pipeline {
  agent { label 'jenkins-gcp-ubuntu20' }
  options {
    timeout(time: 30, unit: 'MINUTES')
  }
  environment {
    NODE_VERSION = '18.16.0'
  }
  stages {
    stage('Prepare') {
      steps {
        nvm(env.NODE_VERSION) {
          sh 'npm install'
        }
      }
    }
    stage('Test') {
      steps {
        nvm(env.NODE_VERSION) {
          sh 'npm test'
        }
      }
    }
    stage('Build') {
      when {
        anyOf {
          branch 'master'
          branch 'release'
        }
      }
      steps {
        nvm(env.NODE_VERSION) {
          sh 'npm run build'
        }
      }
    }
    stage('Publish') {
      when {
        allOf {
          branch 'master'
          expression { return new_version() }
        }
      }
      steps { publish() }
    }
  }
}

def published_version() {
  return sh(
      script: 'npm view $(jq -r .name < package.json) version',
      returnStdout: true
  ).trim()
}

def package_version() {
  return sh(
      script: 'jq -r .version < package.json',
      returnStdout: true
  ).trim()
}

def new_version() {
  return (published_version() != package_version())
}

def publish() {
  sh 'npm publish'
  sh "git tag -a 'v${package_version()}' -m 'npm version v${package_version()}'"
  sh "git push origin 'v${package_version()}'"
}
