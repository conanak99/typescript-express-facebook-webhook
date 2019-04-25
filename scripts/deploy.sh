git pull

rm -rf build

yarn install
yarn build

yarn tunnel-stop
pm2 stop pm2.json

pm2 start pm2.json
yarn tunnel-start