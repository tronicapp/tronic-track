#!/bin/sh

# Allow the service to run without chamber (for ci, docker-compose, etc)
if [ -z "$NO_CHAMBER" ];then
  exec chamber exec tronic-receiver -- node dist/src/boot.js
else
  exec node dist/src/boot.js
fi;
