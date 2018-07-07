.PHONY: build-js

all: dist build-js dist/index.html

dist:
	mkdir -p dist

build-js:
	npx webpack --config webpack.dev.js

dist/index.html:
	cp src/index.html dist

clean:
	rm -r dist
