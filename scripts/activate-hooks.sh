#! /bin/bash

if [ $# -ne 1 ] ; then
  echo "$0 <path-to-repo-root>"
  echo "Example: $0 /home/user/workspace/shopozor-consumer-frontend"
  exit 1
fi 

ROOT=$1

pip install pre-commit
cd $ROOT/graphql
pre-commit install 