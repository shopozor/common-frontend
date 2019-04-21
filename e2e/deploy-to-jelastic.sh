#!/bin/bash

if [ $# -lt 5 ] ; then
  echo "Usage: $0 hosterUrl appId login password envName [deploy_group = cp] [path-to-manifest = manifest.jps]"
  exit 0
fi

. common/e2e/helpers.sh

HOSTER_URL=$1
APPID=$2

SESSION=$(getSession $3 $4 ${HOSTER_URL})
ENV_NAME=$5
DEPLOY_GROUP=${6:-cp}
MANIFEST=${7:-manifest.jps}

getEnvs() {
  local session=$1
  echo "Getting environments..." >&2
  local cmd=$(curl -k \
    -H "${CONTENT_TYPE}" \
    -A "${USER_AGENT}" \
    -X POST \
    -fsS ${HOSTER_URL}/1.0/environment/control/rest/getenvs -d "appid=${APPID}&session=${session}")
#  exitOnFail $cmd
  echo "Got environments" >&2
  echo $cmd
}

wasEnvCreated() {
  echo "envName = $2" >&2
  local envs=$1
  local envName=$2
  echo "Check if environment <$envName> exists..." >&2
  local envExists=$(echo $envs | jq '[.infos[].env.envName]' | jq "index(\"$envName\")")
  echo "Existence of environment <$envName> checked" >&2
  echo $envExists
}

waitUntilEnvIsRunning () {
  local session=$1
  local envName=$2
  while true
  do
    envInfo=$(curl -k \
    -H "${CONTENT_TYPE}" \
    -A "${USER_AGENT}" \
    -X POST \
    -fsS ${HOSTER_URL}/1.0/environment/control/rest/getenvinfo -d "session=${session}&envName=${envName}")
    STATUS=$(echo $envInfo | jq '.env.status')
    if [ "$STATUS" == "1" ] ; then
      break;
    else
      sleep 1
    fi
  done
}

hasTimedOut() {
  local result=$1
  [[ "$result" == "17" ]] && echo 1 || echo 0
}

installEnvUntilNoTimeout() {
  local session=$1
  local envName=$2
  local manifest=$3
  local result="17" # this is the timeout result value
  while [ "$(hasTimedOut $result)" == 1 ] ; do
    echo "Attempting installation..." >&2
    local cmd=$(curl -k \
    -A "${USER_AGENT}" \
    -H "${CONTENT_TYPE}" \
    -X POST -fsS ${HOSTER_URL}"/1.0/development/scripting/rest/eval" \
    --data "session=${session}&shortdomain=${envName}&envName=${envName}&script=InstallApp&appid=appstore&type=install&charset=UTF-8" --data-urlencode "manifest=$manifest")
    result=$(getCommandResult $cmd)
  done
}

installEnv() {
  local session=$1
  local envName=$2
  local pathToManifest=$3
  local manifest=$(cat $pathToManifest)
  echo "Installing new environment <$envName> from manifest <$pathToManifest>..." >&2
  installEnvUntilNoTimeout $session $envName $manifest
  # From our XP, Jelastic is not reliable enough to assume that the InstallApp command was really successful
  # Therefore we check that the environment is really running after that command
  waitUntilEnvIsRunning $session $envName
  echo "Environment <$envName> installed" >&2
}

startEnv() {
  local session=$1
  local envName=$2
  echo "Starting up environment <$envName>..." >&2
  local cmd=$(curl -k \
    -H "${CONTENT_TYPE}" \
    -A "${USER_AGENT}" \
    -X POST \
    -fsS ${HOSTER_URL}/1.0/environment/control/rest/startenv -d "session=${session}&envName=${envName}")
  exitOnFail $cmd
  echo "Environment <$envName> started" >&2
}

startEnvIfNecessary() {
  local session=$1
  local envName=$2
  local envs=$3
  local envProps=$(echo $envs | jq '.infos[] | select(.env.envName=="${envName}")')
  local status=$(echo $envProps | jq '.env.status')
  if [ "$status" != "1" ] ; then
    startEnv $session "$envName"
  fi
}

redeployEnvironment() {
  local session=$1
  local envName=$2
  local deployGroup=$3
  echo "Redeploying group <$deployGroup> of environment <$envName>" >&2
  local cmd=$(curl -k \
    -H "${CONTENT_TYPE}" \
    -A "${USER_AGENT}" \
    -X POST \
    -fsS ${HOSTER_URL}/1.0/environment/control/rest/redeploycontainersbygroup \
    -d "appid=${APPID}&session=${session}&envName=${envName}&tag=latest&nodeGroup=${deployGroup}&useExistingVolumes=true&delay=20")
  exitOnFail $cmd
  echo "Environment redeployed" >&2
}

deployToJelastic() {
  ENVS=$(getEnvs $SESSION)
  CREATED=$(wasEnvCreated "$ENVS" "${ENV_NAME}")

  # TODO: if the manifest changed (according to git history), then re-install the environment, don't just redeploy it

  if [ "${CREATED}" == "null" ]; then
    installEnv $SESSION "${ENV_NAME}" "$MANIFEST"
  else
    startEnvIfNecessary $SESSION "${ENV_NAME}" "$ENVS"
    redeployEnvironment $SESSION "${ENV_NAME}" ${DEPLOY_GROUP}
  fi

  exit 0
}

deployToJelastic
