import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
// const srcFolder = "/src";

export const path = {
  build: {
    files: `${buildFolder}/files/`,

    jsMain: `${buildFolder}/main/scripts/`,
    cssMain: `${buildFolder}/main/styles/`,
    htmlMain: `${buildFolder}/`,
    filesMain: `${buildFolder}/main/files/`,

    jsForm: `${buildFolder}/form/scripts/`,
    cssForm: `${buildFolder}/form/styles/`,
    htmlForm: `${buildFolder}/form/`,
    filesForm: `${buildFolder}/form/files/`,

    jsCases: `${buildFolder}/cases/scripts/`,
    cssCases: `${buildFolder}/cases/styles/`,
    htmlCases: `${buildFolder}/cases/`,
    filesCases: `${buildFolder}/cases/files/`,

    jsCaseDetail: `${buildFolder}/caseDetail/scripts/`,
    cssCaseDetail: `${buildFolder}/caseDetail/styles/`,
    htmlCaseDetail: `${buildFolder}/caseDetail/`,
    filesCaseDetail: `${buildFolder}/caseDetail/files/`,

    jsBusiness: `${buildFolder}/business/scripts/`,
    cssBusiness: `${buildFolder}/business/styles/`,
    htmlBusiness: `${buildFolder}/business/`,
    filesBusiness: `${buildFolder}/business/files/`,
  },
  src: {
    jsMain: `./main/src/scripts/index.js`,
    cssMain: [
      `./commonSrc/styles/index.scss`,
      `./commonSrc/styles/swiper.scss`,
      `./main/src/styles/index.scss`,
    ],
    htmlMain: `./main/src/*.html`,
    files: `./commonSrc/files/**/*.*`,

    jsForm: `./form/src/scripts/index.js`,
    cssForm: [`./commonSrc/styles/index.scss`, `./form/src/styles/index.scss`],
    htmlForm: `./form/src/*.html`,
    // filesForm: `./form/src/files/**/*.*`,

    jsCases: `./cases/src/scripts/index.js`,
    cssCases: [
      `./commonSrc/styles/index.scss`,
      `./cases/src/styles/index.scss`,
    ],
    htmlCases: `./cases/src/*.html`,
    // filesCases: `./cases/src/files/**/*.*`,

    jsCaseDetail: `./caseDetail/src/scripts/index.js`,
    cssCaseDetail: [
      `./commonSrc/styles/index.scss`,
      `./caseDetail/src/styles/index.scss`,
    ],
    htmlCaseDetail: `./caseDetail/src/*.html`,

    jsBusiness: `./business/src/scripts/index.js`,
    cssBusiness: [
      `./commonSrc/styles/index.scss`,
      `./business/src/styles/index.scss`,
    ],
    htmlBusiness: `./business/src/*.html`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  rootFolder: rootFolder,
  ftp: '',
};
