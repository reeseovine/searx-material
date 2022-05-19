# SearXNG Material 3 theme

This branch is a work-in-progress port to a native theme for SearXNG.

You can find the userstyle version on the [`main` branch](https://github.com/reeseovine/searx-material/tree/main).

## Developing

This theme is still in development. To get it working with SearXNG, follow these steps:

1. Clone this repository somewhere on your computer.
2. Clone [`searxng`](https://github.com/searxng/searxng) somewhere else on your computer.
3. Symbolically link (or copy) `templates/material` from this repo to `searx/templates/material` in the `searxng` repo:  
  ```sh
ln -sf $PWD/templates/material/ /path/to/searxng/searx/templates/material
  ```
4. Symbolically link `themes/material` from this repo to `searx/static/themes/material` in the `searxng` repo:  
  ```sh
ln -sf $PWD/themes/material/ /path/to/searxng/searx/static/themes/material
  ```
5. Symlink the files `Makefile` and `manage` from this repo into the root of the `searxng` repo.
6. Follow their [Development Quickstart](https://docs.searxng.org/dev/quickstart.html) guide for the rest of the steps.
