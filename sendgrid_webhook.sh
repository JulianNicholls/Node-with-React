#! /bin/bash

function localtunnel {
  node_modules/.bin/lt --subdomain julianemailywebhook --port 5000 --print-requests
}

until localtunnel; do
  echo 'Local Tunnel restarting'
  sleep 2
done
