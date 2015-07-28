uglifyjs js/d3binding.js -o js/d3binding.min.js
uglifyjs js/functions.js -o js/functions.min.js
uglifyjs js/main.js -o js/main.min.js
uglifyjs js/functions.js -o js/functions.min.js
uglifyjs js/vendor/d3.legend.js -o js/vendor/d3.legend.min.js
uglifyjs js/vendor/d3.surface.js -o js/vendor/d3.surface.min.js
cat js/vendor/d3.v3.min.js js/vendor/jquery.min.js js/functions.min.js js/highlight.pack.js js/vendor/d3.legend.min.js js/vendor/d3.surface.min.js js/main.min.js js/d3binding.min.js js/vendor/modernizr-2.6.2-respond-1.1.0.min.js > js/js.min.js

uglifycss css/bootstrap.css > css/bootstrap.min.css
uglifycss css/github.css > css/github.min.css
cat css/bootstrap.min.css css/github.min.css > css/css.min.css