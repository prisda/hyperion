# Hyperion

Join the epic journey to save humanity

## Getting Started

To begin, change your app name in `package.json`

```
{
  "name": "your-app-name",
  ...
}
```

## Installation

We recommend you to use [Node.js](https://nodejs.org/) v16+ and latest NPM version to run.
Install the dependencies and devDependencies.

```sh
npm install
```

## Development

To customize the styles and scripts, edit all your development resource in `/src`.
Make a change in your file and instantaneously see your updates!
Open your favorite terminal and run these commands.

```sh
npm start
```

or just watch files with external dev server or live server

```sh
npm run watch
```

## Building for source

For test release:

```sh
npm run build
```

For production release:

```sh
npm run build:prod
```

## You Need To Know

- We already have [Bootstrap v5.2](https://getbootstrap.com/) and [jQuery](https://jquery.com/) in this project, so you don't need to add it manually in html.
- For images and fonts or other asset resources, put all assets in `/src/media` folder and it will be copied to `/dist/assets/media` folder. Also when you want to add a plugin into this project, you should put the plugin in `/src/plugins` folder, and it will be copied to `/dist/assets/plugins`.
- For styling pages separately, you just need to create a file with name without underscore in front of the file name in the folder `/src/scss/pages`.
- For javascript files, you can add a javascript file anywhere and it will compiled according to the file path in the `dist` folder.
- If you want to use `url()` to import some resource files from `src` inside your scss file, make sure the path you import is fully relative to your current file.

## SCSS Architecture

In this project we're using [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern) for our architecture.

- `abstracts/`, contains variables, functions, mixins, tools and helpers used across the project.
- `base/`, contains reset file, some typographic rules, and some standard styles for commonly used HTML elements.
- `components/`, contains all kind of specific modules like slider, loader, widget, and basically anything along those lines.
- `layouts/`, contains everything that takes part in laying out the site like header, footer, navigation, or sidebar.
- `pages/`, contains styles for a specific page you can put here (you should import `_init.scss` in first line of your page style file).
- `themes/`, contains theme settings (we don't need it now).
- `vendors/`, contains styles for external libraries.

## License

UNLICENSED
