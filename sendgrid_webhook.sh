function localtunnel {
  node_modules/.bin/lt -s julianemailywebhook -p 5000 --print-requests
}

until localtunnel; do
  echo 'Local Tunnel restarting'
  sleep 2
done
