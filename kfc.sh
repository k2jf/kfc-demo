#!/bin/bash
if [ $# == 0 ]; then
  echo "Usage: kfc <add|pull|push> <component> <branch>"
  exit 2
fi

if [ $1 == "add" ]; then
  if [ $# == 3 ]
  then
    cmd1="git remote add -f $2 git@github.com:k2jf/$2.git"
    echo $cmd1
    $cmd1
    cmd2="git subtree add -P src/components/$2 $2 $3"
    echo $cmd2
    $cmd2
  else
    echo "Usage: kfc add <component> <branch>"
  fi
elif [ $1 == "pull" ]; then
  if [ $# == 3 ]; then
    cmd1="git subtree pull -P src/components/$2 $2 $3"
    echo $cmd1
    $cmd1
  else
    echo "Usage: kfc pull <component> <branch>"
  fi
elif [ $1 == "push" ]; then
  if [ $# == 3 ]; then
    cmd1="git subtree push -P src/components/$2 $2 $3"
    echo $cmd1
    $cmd1
  else
    echo "Usage: kfc push <component> <branch>"
  fi
else
  echo "unknown command: $1"
fi
