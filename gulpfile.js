import gulp from "gulp";
import rsync from "gulp-rsync";

gulp.task("deploy", function () {
  return gulp.src(["dist/**"]).pipe(
    rsync({
      root: "dist/",
      hostname: "42.192.230.152",
      destination: "/home/jacob/LordHamster",
      progress: true,
      username: "jacob",
    })
  );
});
