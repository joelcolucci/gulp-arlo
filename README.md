# gulp-arlo
> Tools to build a simple static site with Gulp.

## Getting Started
Install with NPM:
```bash
npm install --save-dev gulp-arlo
```

Require in your gulpfile.js
```javascript
const arlo = require('gulp-arlo');
```

## Using arlo.mapRoutes
The `mapRoutes` method will map your html template files to the desired route. This allows you to have a simple `src` directory structure and still get pretty URLs.

Example of the `src` directory:
```
|-- src/
|    |-- index.html
|    |-- about.html
|    |-- contact.html
```
Example of the generated `dist` directory:
```
|-- dist/
|    |-- index.html
|    |-- about/
|         |-- index.html
|    |-- contact/
|         |-- index.html
```

Here's the build task using arlo.mapRoutes:
```javascript
gulp.task('build', () => {
  return gulp.src('./src/*.html')
    .pipe(arlo.mapRoutes({
      'index.html': '/'
      'about.html': '/about',
      'contact.html': '/contact',
    }))
    .pipe(gulp.dest('./dist'));
});
```

