import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  // Шукаємо файли шрифтів .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Конвертуємо в .ttf
      .pipe(
        fonter({
          formats: ["ttf"],
        })
      )
      // Вигружаємо в початкову  папку
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  );
};
export const ttfToWoff = () => {
  // Шукаємо файли шрифтів .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Конвертуємо в .woff
      .pipe(
        fonter({
          formats: ["woff"],
        })
      )
      // Вигружаємо в  папку c результатами
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Шукаємо файли шрифтів .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // Конвертуємо в .woff2
      .pipe(ttf2woff2())
      // Вигружаємо в  папку c результатами
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontsStyle = () => {
  // Підключення шрифтів
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // Перевыряємо чи існують файли шрифтів
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tfont-display:swap;\n\tsrc:url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style:normal;\n}\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Якщо файл  є  то виводимо повідомлення
        console.log(
          "Файл scss/font.scss вже існує.Для обновлення файла потрібно його видалити"
        );
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
