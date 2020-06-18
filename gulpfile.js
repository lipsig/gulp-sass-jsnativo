var gulp = require("gulp");
var html = require("gulp-htmlmin");
var sass = require("gulp-sass");
var babel = require("gulp-babel");

// gulp.task("default",  function(){
//     return
// })
gulp.task("minificaHtml", ()=>{
    return gulp.src("./src/index.html")
           .pipe(html({collapseWhitespace:true})) 
           .pipe(gulp.dest('./dist/'));
})


gulp.task('build-images-dev', ()=> {
    return gulp.src(['./src/assets/*.{gif,jpg,png,svg}'])
        .pipe(gulp.dest('dist/assets'));
  });




//transpilando e importando json
gulp.task('js', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['@babel/env'],
            plugins: ["inline-json-import", {}],
        }))
        .pipe(gulp.dest('./dist/'))
);


gulp.task("sass", faz =>{
    gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle:"compressed"}))
    .pipe(gulp.dest('./dist/css'));
    faz();
})





//nos pipes a cima foi concatenado outras tarefas como buscar arquivos, usando gulp.src e enviar arquivos 
//com o gulp.dest


gulp.task('watch', function(){
    gulp.watch('./src/index.html', gulp.series('minificaHtml'));
    gulp.watch('./src/assets/.{gif,jpg,png,svg}', gulp.series('build-images-dev'));
    gulp.watch('./src/scss/style.scss', gulp.series('sass'));
    gulp.watch('./src/app.js', gulp.series('js'));
});



//executar todas tarefas na padrão, a ordem importa.
//minifica sera executada antes da padrao 

gulp.task('default', gulp.series('minificaHtml','build-images-dev','sass','js','watch'), function() {
});

