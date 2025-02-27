pipeline {
  agent { label 'kubernetes' }
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
          branch 'main'
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
          branch 'main'
          expression { return new_version() }
        }
      }
      steps { publish() }
    }
  }
  post { 
    always { 
      script {
        jenkinsNotification()
      }
    }
  }
}

def published_version() {
  return nvm(env.NODE_VERSION) {
    sh(
        script: 'npm view $(jq -r .name < package.json) version',
        returnStdout: true
    ).trim()
  }
}

def package_version() {
  return nvm(env.NODE_VERSION) {
    sh(
      script: 'jq -r .version < package.json',
      returnStdout: true
    ).trim()
  }
}

def new_version() {
  return (published_version() != package_version())
}

def publish() {
  return nvm(env.NODE_VERSION) {
    sh 'npm publish'
    sh "git tag -a 'v${package_version()}' -m 'npm version v${package_version()}'"
    sh "git push origin 'v${package_version()}'"
  }
}
