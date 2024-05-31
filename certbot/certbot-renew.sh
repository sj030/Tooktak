#!/bin/sh

trap 'exit 0' TERM

while :; do
  certbot renew
  sleep 12h & wait $!
done
