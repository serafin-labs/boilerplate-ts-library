<p align="center"><img src="https://serafin-labs.github.io/images/logo-serafin-with-text-1080.png" width="300"/></p>

**Serafin boilerplate-ts-library** is a boilerplate project to ease the creation of a Typescript library.

## Features

It provides a ready to dev **Typescript** environment, with the following features:
* **docker-compose.yml** file with a setup to work on the library in a *Docker* container
* *Webpack* watch loop to **compile *Typescript* on file change**
* **unit tests** launched (with *istanbul* + *mocha*) on each compilation
* ***Typescript* code coverage** created on compilation (with *istanbul* + *mocha*), as an *LCOV* file and an *HTML* report
* a **unit test** debug *npm* task
* some ***Visual Studio Code* base configuration**


## Choices

* *Webpack* has been chosen for its performance, and replaces partly tasks we would have formerly handled with *Gulp*
* *npm scripts* have also been preferred to *Gulp* tasks for simplicity
* choice was made to prefer *npm* over *yarn* to choose compatibility over performance
* choice was made to prefer *ts-loader* over *awesome-ts-loader* to choose a more widespread/standard library

## Running

To run the library in a **docker container** (for an isolated environment), run ```docker-compose up```.

## Debugging

To debug the library through its unit tests:
* run: ```npm run-script debug```.
* launch the debugger in *Visual Studio Code*

When run as a **docker container**, debug the library through its unit tests, run:
```docker-compose exec -T app npm run-script debug```.
