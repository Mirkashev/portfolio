import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./public/build";
const srcFolder = "./public/src";

export const path = {
  build: {
    js: `${buildFolder}/scripts/pc`,
    css: `${buildFolder}/css/`,
    mobile: `${buildFolder}/scripts/mobile`,
    // html: `${buildFolder}/`,
    files: `${buildFolder}/files/`,
    admin: `${buildFolder}/scripts/admin`,
  },
  src: {
    js: `${srcFolder}/js/gamePc/index.js`,
    scss: `${srcFolder}/css/pc.scss`,
    mobile: `${srcFolder}/js/gameMobile/index.js`,
    // html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    admin: `${srcFolder}/js/admin/index.js`,
  },
  watch: {
    js: `${srcFolder}/js/gamePc/**/*.js`,
    scss: `${srcFolder}/css/**/*.scss`,
    mobile: `${srcFolder}/js/gameMobile/**/*.js`,
    // html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    admin: `${srcFolder}/js/admin/index.js`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: "",
};
