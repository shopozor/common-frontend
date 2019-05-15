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
CONTEXT="ROOT"

wasEnvCreated() {
  echo "envName = $2" >&2
  local envs=$1
  local envName=$2
  echo "Check if environment <$envName> exists..." >&2
  local envExists=$(echo $envs | jq '[.infos[].env.envName]' | jq "index(\"$envName\")")
  echo "Existence of environment <$envName> checked" >&2
  echo $envExists
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
  # TODO: when the redeploy has worked, the exitOnFail interprets that as an error
  # exitOnFail $cmd
  echo "Environment redeployed" >&2
}

hasVCSProject() {
  local session=$1
  local envName=$2
  local deployGroup=$3
  local context=$4
  echo "Getting VCS project context <$context> from group <$deployGroup> of environment <$envName>" >&2
  local cmd=$(curl -k \
    -H "${CONTENT_TYPE}" \
    -A "${USER_AGENT}" \
    -X POST \
    -fsS ${HOSTER_URL}/1.0/environment/vcs/rest/getproject \
    -d "envName=${envName}&session=${session}&nodeGroup=${deployGroup}&context=${context}")
  local result=$(getCommandResult $cmd)
  [[ "$result" == "0" ]] && echo 1 || echo 0
  echo "Got VCS project" >&2
  
}

updateVCSProject() {
  local session=$1
  local envName=$2
  local deployGroup=$3
  local context=$4
  echo "Updating VCS project context <$context> from group <$deployGroup> of environment <$envName>" >&2
  local cmd=$(curl -k \
    -H "${CONTENT_TYPE}" \
    -A "${USER_AGENT}" \
    -X POST \
    -fsS ${HOSTER_URL}/1.0/environment/vcs/rest/update \
    -d "envName=${envName}&session=${session}&nodeGroup=${deployGroup}&context=${context}")
  exitOnFail $cmd
  echo "Updated VCS project" >&2
}

deployToJelastic() {
  ENVS=$(getEnvs $SESSION)
  CREATED=$(wasEnvCreated "$ENVS" "${ENV_NAME}")

  # TODO: if the manifest changed (according to git history), then re-install the environment, don't just redeploy it

  if [ "${CREATED}" == "null" ]; then
    installEnv $SESSION "${ENV_NAME}" "$MANIFEST"
  else
    startEnvIfNecessary $SESSION "${ENV_NAME}" "$ENVS"
    hasVCS=$(hasVCSProject $SESSION "${ENV_NAME}" ${DEPLOY_GROUP} $CONTEXT)
    if [ "$hasVCS" == "0" ] ; then
      redeployEnvironment $SESSION "${ENV_NAME}" ${DEPLOY_GROUP}
    else
      updateVCSProject $SESSION "${ENV_NAME}" ${DEPLOY_GROUP} $CONTEXT
    fi
  fi

  exit 0
}

deployToJelastic
