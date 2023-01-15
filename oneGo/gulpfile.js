import gulp from 'gulp';

global.app = {
  path: path,
  gulp: gulp,
};

import { reset } from './gulp/tasks/reset.js';
import { path } from './gulp/config/path.js';

import { copyMain } from './gulp/tasks/main/copy.js';
import { htmlMain } from './gulp/tasks/main/html.js';
import { scssMain } from './gulp/tasks/main/scss.js';
import { jsMain } from './gulp/tasks/main/js.js';

import { copyForm } from './gulp/tasks/form/copy.js';
import { htmlForm } from './gulp/tasks/form/html.js';
import { scssForm } from './gulp/tasks/form/scss.js';
import { jsForm } from './gulp/tasks/form/js.js';

import { copyCases } from './gulp/tasks/cases/copy.js';
import { htmlCases } from './gulp/tasks/cases/html.js';
import { scssCases } from './gulp/tasks/cases/scss.js';
import { jsCases } from './gulp/tasks/cases/js.js';

import { copyCaseDetail } from './gulp/tasks/caseDetail/copy.js';
import { htmlCaseDetail } from './gulp/tasks/caseDetail/html.js';
import { scssCaseDetail } from './gulp/tasks/caseDetail/scss.js';
import { jsCaseDetail } from './gulp/tasks/caseDetail/js.js';

import { copyBusiness } from './gulp/tasks/business/copy.js';
import { htmlBusiness } from './gulp/tasks/business/html.js';
import { scssBusiness } from './gulp/tasks/business/scss.js';
import { jsBusiness } from './gulp/tasks/business/js.js';

const mainTasks = gulp.parallel(copyMain, htmlMain, scssMain, jsMain);
const formTasks = gulp.parallel(copyForm, htmlForm, scssForm, jsForm);
const casesTasks = gulp.parallel(copyCases, htmlCases, scssCases, jsCases);
const caseDetail = gulp.parallel(
  copyCaseDetail,
  htmlCaseDetail,
  scssCaseDetail,
  jsCaseDetail
);
const businessTasks = gulp.parallel(
  copyBusiness,
  htmlBusiness,
  scssBusiness,
  jsBusiness
);

const dev = gulp.series(
  reset,
  mainTasks,
  formTasks,
  casesTasks,
  caseDetail,
  businessTasks
);

// const dev = gulp.series(reset, copy);

gulp.task('default', dev);
