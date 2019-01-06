pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'JENKINS_NODE_COOKIE=dontKillMe node index.js &'
      }
    }
    stage('Test') {
      steps {
        sh 'sudo npm install newman -g'
        sh 'newman run ./postman/daily-bread-id-service.postman_collection.json --reporters cli,junit --reporter-junit-export newman.xml --insecure'
      }
    }
    stage('Deploy') {
      steps {
        sh 'mkdir -p /home/jorodriguez/meritoki/dailybread/'
        sh 'sudo rm -rf id'
        sh 'sudo git clone -b dev https://github.com/meritoki/id.git'
        sh 'cd id'
        sh 'git branch -a'
        sh 'git status'
        sh 'docker stop auth-service || true && docker rm auth-service || true'
        sh 'docker rmi $(docker images |grep \'dailybread/auth-service\') || true'
        sh 'docker build -t dailybread/id-service .'
        sh 'sudo docker run --network host -dlt --restart unless-stopped -p 3000:3000 dailybread/id-service'
      }
    }
  }
  triggers {
    cron('H/15 * * * *')
  }
}
