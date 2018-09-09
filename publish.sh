npm run build

cp -r ./src/* .
rm -rf index.js

npm publish

rm -rf ./components