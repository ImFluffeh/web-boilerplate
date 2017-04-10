# Foundation, ES6, build system all in one

## Setup
1. (if you haven't installed git already, <a href="https://www.atlassian.com/git/tutorials/install-git"> git on it</a>)
2. Open the terminal/command prompt of your choosing
3. `git clone https://github.com/ImFluffeh/web-boilerplate.git`
4. Open Package.json and fix everything that is in all capitals.
5. `npm install`
6. Start coding
7. Reference `File Usage -> gulpfile.js`
8. Have fun

***

## Important Files

- config.js
- gulpfile.js
- webpack.config.js
___

## File Usage
### config.js
This is global import file. Anything to do with config, create a new file, `require("./file")` your config, then add it to the table. 


```
// Name your config 'namespace' 
module.exports = {
    Webpack: require('./webpack.config'),
    Globals: require('./globalsettings'),
    YourConfigNamespace: require('./yourfile')
}
	
```

### gulpfile.js
The task runner file.

**Properties**

| Property | Purpose | Usage |
| --- | :---: | :--- |
| ReqDirs | For copying dependency outputs from other folders to the release folder | `{node: "The Other Place", out: "Where you want it to go"}`


**Functions**

| Task | What it does |
| --- | :--- |
| (default) | Builds the SCSS and Javascript folders. Output: `build/css` and `build/js`
| build | Builds the SCSS and Javascript folders. Output: `build/css` and `build/js`
| build-js | Builds just the Javascript folder. Output `build/js/scripts.js`
| build-scss | Builds only the SCSS folder. Output `build/css/index.css`
| compress-js | First runs build-js, then "uglifies" the javascript. Output: `release/js/scripts.js`
| compress-css | First runs build-js, then minifies the css. Output `release/css/index.css`
| makedirs | Reads through ReqDirs, creating the necessary directories and copying `node` to `out`
| clean | Deletes the `build` and `release` directories
| release | Builds JS and SCSS, compresses packaged outputs, and copies dependencies to `release`


If you're unfamiliar with gulp, this is how you would go about using these 'tasks'

`gulp <taskname>`


### globalsettings.js
Important globals would go in this file.

| Variable | Purpose |
| --- | :--- |
| build | The build directory
| src | The source code directory 
| release | The directory with release code
| jsdir | The javascript source directory
| jsentry | The javascript entry point (main file)
| scssdir | The scss source directory
| scssentry | The scss entry point
| scssincludes | An array of includes so you don't have to use absolute paths. 

Note: If you want to expand the scss includes directory, just add to the array of paths for scss-includes so you can `@import "justafile";`

___

##### Why another boilerplate?

- I made it for me
- If someone else wanted to streamline the process of getting an ES6 workflow going, this is here.

##### Why did you organize it like this?
- I wanted it to be abstract enough that expansion is very easy. The existing code should be possible to completely ignore, with some exceptions. The result was what you see here.

##### What if something doesn't work properly?
- Let me know. I will do what I can to fix it
