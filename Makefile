local-run:
	deno run ./demo.ts

local-test:
	deno test

build:
	docker build -t battleship .

run: build
	docker run -it battleship deno run demo.ts

test: build
	docker run -it battleship deno test

.PHONY: run test build local-run local-test
