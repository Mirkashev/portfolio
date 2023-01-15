import gulp from "gulp";

import { path } from "./gulp/config/path.js";

global.app = {
  path: path,
  gulp: gulp,
  //   plugins: plugins,
};

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
// import { html } from "./gulp/tasks/html.js";
// import { plugins } from "./gulp/config/plugins.js";
// import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
// import { mobile } from "./gulp/tasks/mobile.js";
import { adminTask } from "./gulp/tasks/admin.js";

function watcher() {
  gulp.watch(path.watch.files, copy);
  // gulp.watch(path.watch.mobile, mobile);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.admin, adminTask);
}

const mainTasks = gulp.parallel(js, adminTask, copy, scss);

const dev = gulp.series(reset, mainTasks, watcher);

gulp.task("default", dev);
