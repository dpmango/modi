# MODI HTML/CSS

https://modi-html.surge.sh


## How to start
* `npm install` or `yarn` - install npm dependencies
* `bower install` - install bower dependencies
* `gulp` - run dev-server
* `gulp build` - build project from sources


--
## List of Gulp tasks

To run separate task type in command line `gulp [task_name]`.
Almost all tasks also have watch mode - `gulp [task_name]:watch`, but you don't need to use it directly.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`build:development`| build dev version of project (without code optimizations)
`build`            | build production-ready project (with code optimizations)

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`sass` 	         | compile .sass/.scss to .css. We also use [postcss](https://github.com/postcss/postcss) for [autoprefixer](https://github.com/postcss/autoprefixer) and bunch of other awesome postcss [plugins](https://github.com/postcss/postcss#plugins) when needed
`copy`             | copy common files from `./src` path to `./dist` path
`pug`             | compile [pug](https://pugjs.org/) templates
`sprite:png`       | create png sprites
`server`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean`            | remove `./dist` folder

All available tasks are placed in a folder `./gulp/tasks` as separate *.js files. Usually, file name = task name._


## Flags

We have several useful flags.

* `gulp --open` or `gulp server --open` - run dev server and then open preview in browser
* `gulp --tunnel=[name]` or `gulp server --tunnel [name]` - runs dev server and allows you to easily share a web service on your local development machine (powered by [localtunnel.me](https://localtunnel.me/)). Your local site will be available at `[name].localtunnel.me`.
* `gulp [task_name] --prod` or `gulp [task_name] --production` - run task in production mode. Some of the tasks (like, sass or js compilation) have additional settings for production mode (such as code minification), so with this flag you can force production mode. `gulp build` uses this mode by default.


### Setup + all packages
`yarn add gulp require-dir run-sequence gulp-util gulp-notify gulp-cache del gulp-sass gulp-sourcemaps gulp-postcss autoprefixer cssnano postcss-short postcss-sorting postcss-pseudoelements gulp-rename gulp-imagemin gulp-pug gulp-front-matter gulp-plumber gulp-if browser-sync gulp-consolidate require-yaml gulp-concat gulp-uglify gulp-svgmin gulp-svgstore gulp-cheerio through2 gulp.spritesmith vinyl-buffer gulp-htmlhint gulp-sass-lint gulp-eslint eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-import gulp-replace gulp-svg-sprites`
