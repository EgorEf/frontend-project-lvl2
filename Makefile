install:
	npm install

publishdeb:
	npm publish --dry-run

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test

