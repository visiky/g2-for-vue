npm run build

cp -r ./src/* .
rm -rf index.js
# only use the minify file
mkdir lib
cp -r ./dist/G2VChart.umd.min.js ./lib/index.js
rm -rf ./dist

npm publish

rm -rf ./components