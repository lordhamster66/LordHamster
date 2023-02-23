import gulp from "gulp";
import rsync from "gulp-rsync";

gulp.task("deploy", function () {
  return gulp.src(["dist/**"]).pipe(
    rsync({
      root: "dist/",
      hostname: "blog.lordhamster.com",
      destination: "/home/jacob/LordHamster",
      progress: true,
      username: "jacob",
    })
  );
});
