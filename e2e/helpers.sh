CONTENT_TYPE="Content-Type: application/x-www-form-urlencoded; charset=UTF-8;"
USER_AGENT="Mozilla/4.73 [en] (X11; U; Linux 2.2.15 i686)"

getCommandResult() {
  local command=$1
  echo $(echo $command | jq '.result')
}

exitOnFail() {
  local command=$1
  local result=$(getCommandResult $command)
  if [[ "$result" != "0" ]] ; then
    echo "Following command failed with result $result: $command" >&2
    exit 1
  fi
}

getSession() {
  local login=$1
  local password=$2
  local hosterUrl=$3
  echo "Signing in..." >&2
  local cmd=$(curl -k -H "${CONTENT_TYPE}" -A "${USER_AGENT}"  -X POST \
    -fsS "$hosterUrl/1.0/users/authentication/rest/signin" -d "login=$login&password=$password");
  exitOnFail $cmd
  echo "Signed in" >&2
  echo $(jq '.session' <<< $cmd |  sed 's/\"//g')
}
