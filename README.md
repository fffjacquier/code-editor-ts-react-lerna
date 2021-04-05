# A jupyter-notebook-like code editor, built with typescript and react

![alt text](http://fjacquier.free.fr/myjsnotebook.jpg 'My js notebook')

## My Loosy messy notes from the project

we need a transpiler to execute jsx code in browser
and some Bundling tool

code -> run webpack -> find imports -> fetch files from npm -> complete bundle -> return bundled code

Solution: Using ESBuild for transpiler and bundler
[Esbuild](https://esbuild.github.io)
& Using unpkg.com to get files

run our jbook app on localhost:3000
User write code in a n editor
We bundle in the browser
We execute users code in an iframe

## importing ReactDOM code in the iframe cuts the script in two: one part in head, the other in body

Because a script is defined somewhere in the code of our own script! so it's finding a closing script tag and cuts the script
And if big files in tha attribute srcDoc, we can have pbs too

### store the libs imported with localforage cache

## Using MonacoEditor

## Using React-Resizable ResizableBox

## Making a markdown editor with preview

using @uiw/react-md-editor
MDEditor and MDEditor.Markdown

## Adding redux to handle states for cells

for the bundles part in the state, always try to avoid derived states. Like a todoCount from a todos array that is in the state. Bad practice.
When async operations, avoid using selectors.

### blinking code with createBundle in useeffect

Fix: provide a createBundle that does not change on each effect
Sol: Use useMemo() hook in use-actions.ts

## the bundler should be able to reference code from previous cells

we have to join previous cells'code: for cell3, we should join code from cell1.cell2.cell3

## persist the code in the browser - April 1st

store all the code in one file on user's hard drive
in order for the user to be able to share these file

so localstorage is not an option

## launch app from cli

## how to share the content of notebook to rest of the world?

we can add a publish method in our api

## Using Lerna CLI

tool for managing mutli package project

similar to lerna: bolt, luigi, npm workspaces, yarn workspaces

with lerna, never use npm install, use instead: > lerna add

to add in our cli project

> lerna add commander --scope=cli

link 2 packages without republishing:

> lerna add local-api --scope=cli

add typescript for a package:
one way to do it change index.js to index.ts and in package.jso
n, but not recommended for the cli in js

we need an index.ts and a TSC that creates a dist/index.js and use this file in the cli project

> learn add typescript --dev --scope=local-api

in local-api you need to init Typescript (add tsconfig.json):

> npx typescript --init //OR
> tsc --init

how to watch

> tsc --watch --preserveWatchOutput

we can start the script for cli and local-api
or use some code to run then with a script

> lerna run start --parallel

## cli

### using commander to read cli arguments

## try catch with promise in express

```js
const app = express()
return (
  new Promise`<void`() >
  ((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
)
```

## npm publishing

send to npm registry our 3 projects

when using npm install -g jbook, it should install cli and inside local-api and inside local-client

solution: create a deploy project tiny-npm-deploy
it should start up an express server listening on port 3005
it should have an index.ts with tsc -> index.js

### the steps

1. make sur package name is unique
2. specify what files send to npm when publishing
   add files array in package.json
3. split dependencies and devDependencies
   npm will install only dependencies
4. make package publicly accessible
   "publishConfig": {
   "access": "public"
   },
5. if building a cli, configure the file to run
   "bin": "dist/index.js",
   and add a #!/usr/bin/env node in index.ts
6. add a prepublish script
7. commit to git
8. run npm publish

then you can test with: npx fj-tests-a-tiny-npm-deploy
or install with npm install -g fj-tests-a-tiny-npm-deplo
and after call directly in the cli:
fj-tests-a-tiny-npm-deplo

### use an organization as scope packages

cli -> jsnotebook-cli
local-api -> @jsnotebook-cli/local-api
local-client -> @jsnotebook-cli/local-client

### Declare scope packages

"name": "myjsnotebook" in the cli
and use:: "name": "@myjsnotebook/local-api" model for others packages

this implies renamings the imports

then run : lerna bootstrap

then prepare each package as for tiny-npm-deploy test done before

then lerna publish --no-push

then npm publish
