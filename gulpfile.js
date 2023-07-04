// основний шлях
import gulp from "gulp";
// імпорт шляхів
import { path } from "./gulp/config/path.js";
// імпорт плагінів
import { plugins } from "./gulp/config/plugins.js";

// передаємо значення в основну змінну
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// імпрртуємо дії
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";
// виконуємо сцинапій по замовчинню

// спостерігач за змінами в файлі
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}
// Послідовна перевірка шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);
// побудова сцинарія виконання задач

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);

export { dev };
export { build };
export { deployZIP };
// виконання сценарыя по замовченню
gulp.task("default", dev);
