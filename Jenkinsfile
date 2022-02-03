#!groovy

def PROJECT = "blackspots-unittests-${env.GIT_COMMIT}"

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block();
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel-app', color: 'danger'

        throw t;
    }
    finally {
        if (tearDown) {
            tearDown();
        }
    }
}


node {
    stage("Checkout") {
        checkout scm
    }
    stage("Build develop image") {
    tryStep "build", {
        def image = docker.build("docker-registry.secure.amsterdam.nl/dataservices/subsidies:${env.BUILD_NUMBER}")
        image.push()
        image.push("acceptance")
        }
    }
    stage('Test') {
        steps {
            script {
                sh "docker-compose -p ${PROJECT} up --build --exit-code-from unittest"
            }
        }
    }

}
    node {
        stage("Deploy to ACC") {
        tryStep "deployment", {
            build job: 'Subtask_Openstack_Playbook',
                    parameters: [
                            [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                            [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy.yml'],
                            [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_subsidies"]  
                    ]
            }
        }
    }

String BRANCH = "${env.BRANCH_NAME}"
if (BRANCH == "master") {
    stage('Waiting for approval') {
        slackSend channel: '#ci-channel-app', color: 'warning', message: 'Subsidies is waiting for Production Release - please confirm'
        timeout ( time: 24, unit: "HOURS" )  {
            input "Deploy to Production?"
           milestone 1
        }
    }   
    
    node {
        stage('Push production image') {
        tryStep "image tagging", {
            def image = docker.image("docker-registry.secure.amsterdam.nl/dataservices/subsidies:${env.BUILD_NUMBER}")
            image.pull()
            image.push("production")
            image.push("latest")
            }
        }
    }
    node {
        stage("Deploy") {
        tryStep "deployment", {
            build job: 'Subtask_Openstack_Playbook',
                    parameters: [
                            [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                            [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy.yml'],
                            [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_subsidies"]  
                    ]
            }
        }
    }
}
