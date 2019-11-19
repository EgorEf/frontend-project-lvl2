start:
	npx babel-node 'src/bin/gendiff.js' 8

install:
	npm install

publishdeb:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test

