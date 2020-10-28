# WebPack

Created: Oct 21, 2020 3:19 PM
Created By: Hugo Pachy
Last Edited By: Hugo Pachy
Last Edited Time: Oct 28, 2020 11:28 AM
Status: In Progress 🙌
Type: Technical Spec

Webpack

> A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows for loading parts of the application on demand. Through "loaders", modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and your custom stuff.

# Introduction

First of all webpack take different assets, different files of different types  (js, png, css, ...) and it combines them down it bundles them into a smaller group of file(s). 

this idea behind is very simple :

- Addition to just bundling things together and shoving them into a file it's managing dependencies. It's make sure that code that needs to load first is load first as hard as it sound painful webpack does it for you and it spits out 1/2 files depend of how many files you tell it to bundle.

## Installation:

-[https://www.youtube.com/watch?v=MpGLUVbqoYQ&ab_channel=freeCodeCamp.org](https://webpack.js.org/guides/getting-started/) (docs)

[Getting Started | webpack](https://webpack.js.org/guides/getting-started/)

-Video which introduce and explain who to start a projet and basic setup of webpack

[https://www.youtube.com/watch?v=MpGLUVbqoYQ&ab_channel=freeCodeCamp.org](https://www.youtube.com/watch?v=MpGLUVbqoYQ&ab_channel=freeCodeCamp.org)

## Webpack configuration:

To setup the webpack configuration you can create a file (what ever the name is) named webpack.config.js as the convention subject to do. Secondly you can have multiple file with different configuration.

 the syntax look like this so we are going to export and object :

```jsx
const path = require("path");

module.exports {
	mode: development,
	entry : './src/index.tsx',
	output :{
		filename: "main.js",
		// use path module to resolve absolute path to this directory
		path: path.resolve(__dirname, 'dist')
	},
}
```

- entry : which will take our script at src/index.tsx as the entry point.([https://webpack.js.org/concepts/entry-points/](https://webpack.js.org/concepts/entry-points/))
- output : Configuring the output configuration options tells webpack how to write the compiled files to dist. ([https://webpack.js.org/concepts/output/](https://webpack.js.org/concepts/output/))
- mode: Providing the mode configuration option tells webpack to use its built-in optimizations accordingly. ([https://webpack.js.org/configuration/mode/](https://webpack.js.org/configuration/mode/))
- devTool: This option controls if and how source maps are generated. ([https://webpack.js.org/configuration/devtool/#root](https://webpack.js.org/configuration/devtool/#root))

## Loaders:

Webpack enables use of loaders to preprocess files. This allows you to bundle any static resource way beyond JavaScript. You can easily write your own loaders using Node.js.

Loaders are the magic or the key for getting webpack to handle different  types of files besides JavaScript so there are different packages that we install, and they dictate how certain files should be pre-processed as you import them or as they are loaded.

So you can transform files and do things based off of the type of file for example you can handle a CSS file one way and you can handle a SVG file another way so one docs you can see the most popular loaders : 

[Loaders | webpack](https://webpack.js.org/loaders/#root)

Loaders are very useful it's how we get webpack to  handle to pre-process different types of files.

For example let's add style-loader and css-loader

```bash
npm install --save-dev style-loader css-loader
```

 webpack.config.js

```jsx
module.exports = {
...
	module = {
		rules: [
			{
				test : /\.css$/,
				use : [
								"style-loader", // 2. inject styles to dom
								"css-loader" // 1. Turns CSS into commonjs
								// for sass just add sass-loader to turns sass into CSS
							],
			},
		]
	}
}
```

Webpack will come across that CSS file it's should match this regular expression above, and use css-loader to turn CSS code to a valid JavaScript code in the ./dist/main.js. So the CSS is not apply it's just turn to JavaScript code that's why we gonna use style-loader to apply the CSS code turned to JavaScript code to the DOM, by injecting a style tag.

## Cache busting :

So we're using webpack to bundle our modular application which yields a deployable /dist directory. Once the contents of /dist have been deployed to a server, clients (typically browsers) will hit that server to grab the site and its assets. The last step can be time consuming, which is why browsers use a technique called caching. This allows sites to load faster with less unnecessary network traffic. However, it can also cause headaches when you need new code to be picked up.

webpack.config.js

```jsx
module.exports = {
	...
	output : {
		filename : "main.[contenthash].js",
		path: path(resolve(__dirname,"dist"))
	}
}
```

Just by adding "[contenthash]" webpack gonna take the builded content file and hash it to add to the filename.

## Plugins

A webpack plugin is a JavaScript object that has an apply method. This apply method is called by the webpack compiler, giving access to the entire compilation lifecycle.

Give us the option to customize the webpack build process in a variety of ways. 

[Plugins | webpack](https://webpack.js.org/concepts/plugins/#root)

The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates, or use your own loader. ([https://webpack.js.org/plugins/html-webpack-plugin/#root](https://webpack.js.org/plugins/html-webpack-plugin/#root))

Link to config the HtmlwebpackPlugin : 

[jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

install it :

```bash
npm install --save-dev html-webpack-plugin
```

in the webpack.config.js

```jsx
...
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	...
	plugins: [new HtmlWebpackPlugin()]
}
```

Thank to this plugin you can use "[contenthash]" cause it's dynamically link it to main.js hashed and others import needed, feel free now ? 🆓

## Splitting config files

Let's dive into some of the best practices and utilities for building a production site or application.

The goals of development and production builds differ greatly. In development, we want strong source mapping and a localhost server with live reloading or hot module replacement. In production, our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time. With this logical separation at hand, we typically recommend writing separate webpack configurations for each environment.

While we will separate the production and development specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called webpack-merge. With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations. ([https://webpack.js.org/guides/production/](https://webpack.js.org/guides/production/))

In you root folder let's use this command :

```bash
touch webpack.prod.js webpack.dev.js
```

Now prod and dev file config created let's rename webpack.config.js to webpack.commun.js 

```bash
mv webpack.config.js webpack.commun.js
```

We gonna put all the commun setup in webpack.commun .js, but with need a package to to that. Let use webpack-merge

```bash
npm install --save-dev webpack-merge
```

Inside the commun let's do :

```jsx
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
	plugins : [
		new HtmlWebpackPlugin(),	
	],
	module: {
		rules: [
			{
				test : /\.css$/,
				use : [
							"style-loader", // 2. inject styles to dom
							"css-loader" // 1. Turns CSS into commonjs
							// for sass just add sass-loader to turns sass into CSS
				],
			},
		]
	}
};
```

Inside the dev let's do :

```jsx
const path = require("path");
// let us the context of commun
const commun = require("./webpack.commun.js");
// let us to merge object together
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(commun, {
	mode: "development",
	devServer: {
    contentBase: "./dist",
    open: true // open b rowers window
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
});
```

Inside the production config let's do :

```jsx
const path = require("path");
// let us the context of commun
const commun = require("./webpack.commun.js");
// let us to merge object together
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(commun, {
	mode: "production",
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
});
```

Now that's we got two different configs we need to select one of there depend of the situation.

So to do that we need to update script from package.json.

```json
{
	"scripts": {
			"start": "webpack serve --config webpack.dev.js", // dev start server
			"build:dev": "webpack --config webpack.dev.js", // dev build
			"build": "webpack --config webpack.prod.js", // prod build
	}
}
```

## Hmlt-loader, file-loader and clean-webpack

First of all, one of the good practice is to put every asset (images, polices, gif , ect...).

folder asserts should be located :  "./src/asserts".

For those images or what every we should handle this like we handled CSS or SCSS. That's mean we have to use a loader. let's use html-loader to exports HTML as string. HTML is minimized when the compiler demands. ([https://webpack.js.org/loaders/html-loader/](https://webpack.js.org/loaders/file-loader/))

At first let's install html-loader :

```bash
npm install --save-dev html-loader
```

 

In the webpack.commun.js

```jsx
module.exports = {
	...
	module:
		rules: [
						...,
						{
							test: /\.html$/,
							use:["html-loader"]
						}
		]
}
```

html-loader gonna have so trouble with file include/import so to does not have this kind of problem we gonna use the file-loader resolves import/require() on a file into a url and emits the file into the output directory. ([https://webpack.js.org/loaders/file-loader/](https://webpack.js.org/loaders/file-loader/))

```bash
npm install file-loader --save-dev
```

```jsx
module.exports = {
	...
	module:
		rules: [
						...,
						{
							test: /\.(svg|png|jpeg|gif)$/,
							use: {
								loader : "file-loader",
								options: {
									// add and option to hash the name of each assert and keep extention
									name : [name].[hash].[ext],
									// output inside ./dist/imgs/ folder								
									outputPath: "imgs"
								}
							}
						}
		]
}
```

The other problem we got, it's the main.[contenthash] at every compilation there is a new main.blablablabla.js added to the folder because they have different names. So to fix this we have to use clean-webpack loader to clean up the dist folder at every build.

Installation :

```bash
npm install --save clean-webpack-plugin
```

webpack.prod.js (It wouldn't hurt to add to commun or to dev bit in the dev case we use dev server and they're just in memory temporarily. they are not actually written down they're not saved to the system so not very useful)

```jsx
...
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	...
		plugins: [
					...
					new CleanWebpackPlugin()
		]
}
```

## Multiple entrypoints

Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time. ([https://webpack.js.org/guides/code-splitting/](https://webpack.js.org/guides/code-splitting/))

Could split components, commun, actions, ducks, ect...

webpack.commun.js

```jsx
module.exports = {
	...
		entry: {
					main : "./src/index.js",
					vendor : "./src/vendor"
		}
}
```

webpack.dev.js

```jsx
module.exports = {
	...
		output: {
					filename: "[name].bundle.js"
					...
		}
}
```

webpack.prod.js

```jsx
module.exports = {
	...
		output: {
					filename: "[name].[contenthash].bundle.js"
					...
		}
}
```

## Extract CSS & minify html/Js/CSS

- Let minify CSS first.

    Thanks to style-loader our CSS code is turned / injected to JavaScript code. It useful when you work on dev because you don't need to refresh the page to see any changes. The production is different we need something minified and split to JavaScript, it's nice to have a separate CSS file rather than waiting for JavaScript to inject the styles. The main reason stay the performance if you load a page you will see there's flash of the unstyled content quite a bad User experience... Because when the page load there is no CSS only have a JavaScript file...

    Lucky for you solution exist ! 

    First install mini-css-extract-plugin

    ```bash
    npm install --save-dev mini-css-extract-plugin optimize-css-assets-webpack-plugin
    ```

    We need to add this plugin and to be sure that's we do not use style-loader in the production.

    docs : 

    - mini-css-extract-plugin : [https://webpack.js.org/plugins/mini-css-extract-plugin/#root](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)
    - 

    webpack.prod.js: 

    ```jsx
    ...
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

    module.exports = {
    	plugins : [
    		new MiniCssExtractPlugin({
    				filename: "[name].[contenthash].css",
    		}),
    		...
    	],
    	+optimization : {
    	+	minimizer: [
    	+		new OptimizeCssAssetsWebpackPlugin(),
    	+	]
    	+},
    	+module: {
    	+	rules: [
    	+		  {
    	+		 	 test : /\.css$/,
    	+		 	 use : [
    	+		 	 			MiniCssExtractPlugin.loader, // 2. Extract CSS to dist (or file) 
    	+		 	 			"css-loader" // 1. Turns CSS into commonjs
    	+		 				// for sass just add sass-loader to turns sass into CSS
    	+	 	 	 ],
    	+		  },
    	+	]
    	+}
    }
    ```

    delete the css rule from the commun configuration and move it to dev config 

    webpack.commun.js : 

    ```jsx
    module.exports = {
    	module: {
    		rules: [
    			- {
    			-	 test : /\.css$/,
    			-	 use : [
    			-	 			"style-loader", // 2. inject styles to dom
    			-	 			"css-loader" // 1. Turns CSS into commonjs
    			-				// for sass just add sass-loader to turns sass into CSS
    			-	 ],
    			- },
    		]
    	}
    }
    ```

webpack.dev.js

```jsx
module.exports = {
	module: {
		rules: [
			...
		  + {
			+	 test : /\.css$/,
			+	 use : [
			+	 			"style-loader", // 2. inject styles to dom
			+	 			"css-loader" // 1. Turns CSS into commonjs
			+				// for sass just add sass-loader to turns sass into CSS
			+	 ],
			+ },
		]
	}
}
```

With this setup we will no more waiting for JavaScript loading to include CSS it's automatically imported into the header of our index.html file and will load before JavaScript. So the plugin is extracting all of our CSS code into one CSS file.

If you look at inside the dist folder you will see you CSS code it now minimized but the JavaScript isn't more... So we need to user on terser plugin to do it.

Production mode set up default config for the minimization of the JavaScript code but since we modified the CSS optimization (overrided it),  the JavaScript default config is disabled so we need to config it too

- Let minimize Js code

    Let just terser to minimize our JavaScript code. A JavaScript parser and mangler/compressor toolkit for ES6+,  it's already installed inside of node modules.

    Webpack using by default uglify-js, but we gonna use terser because its better performance compared to other minification tools.

     

    webpack.prod.js

    ```jsx
    ...
    const TerserPlugin = require("terser-webpack-plugin");

    module.exports = {
    	...
    	optimization : {
    		minimizer : [
    			...,
    			new TerserPlugin(),
    		] 
    	}
    	...
    }
    ```

- Html minimize

    Minimization of the html code is simple cause we already have the plugin installed we just need to add some options. Where HtmlWebpackPlugin is used add minify option like the following :

    At first let take off this plugin from webpack.commun.js to put it inside webpack.prod.js

    ```jsx
    module.exports = {
    	...
    	plugins: [
    		...
    		new HtmlWebpackPlugin(),
    		...
    	]
    	...
    }
    ```

webpack.prod.js

```jsx
module.exports = {
	...
	plugins: [
		...
		new HtmlWebpackPlugin({
			minify : {
				removeAttributQuotes : true,
				collapseWhitespace : true,
				removeComents : true,
			}
		}),
		...
	]
}
```

now you did this Js, CSS and HTML code should be optimized.

WebPack configuration is done for now you can add tone of others stuff to custom more your config but of now it's enough to begin.

Terser example :

![WebPack%20a4ae2081f2544830b69410f2cd029353/Capture_decran_le_2020-10-27_a_08.43.40.png](WebPack%20a4ae2081f2544830b69410f2cd029353/Capture_decran_le_2020-10-27_a_08.43.40.png)

thank to terser the index.tsx file which was 721KB is now 324KB  that's a huge compression!
