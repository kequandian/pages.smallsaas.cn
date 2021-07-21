// const [ nodePath, scriptPath, name, API ] = process.argv;
//
// const config = require('./autoTemp/config');
//
// const { outputPath, tempPath, files, modelsPathName, modelsOutputPath } = config;
//
// let fs = require('fs');
// let reads = [];
// files.forEach( (fileName) => {
//     reads.push(`${tempPath}${fileName}`);
// });
//
// const args = {
//     name, API
// };
//
// let exists = function () {
//   return new Promise((res) => {
//       (async function () {
//           fs.existsSync(outputPath + name) ? console.log('目录已存在') : await mkdir(name);
//           res(outputPath);
//       })()
//   })
// }
//
// let mkdir = function (name) {
//   return new Promise((res, rej) => {
//       fs.mkdir(outputPath + name, (err) => {
//           if (err) rej(err);
//           res(outputPath + name);
//       });
//   })
// }
//
// let getFileName = function (path) {
//     let rst = path.replace(/(.*\/)*([^.]+).*/ig,'$2');
//     rst += path.replace(/(\S)*(\.\w+)$/ig,'$2');
//     return rst;
// }
//
// let readFile = function (readPathName,outputPath) {
//     return new Promise((res) => {
//         if( typeof(readPathName) === 'string'){
//             let text = fs.readFileSync(readPathName).toString();
//
//             Object.keys(config.replace).forEach( (v) => {
//                 text = config.replace[v]( text, args );
//             })
//
//             writeFile(`${outputPath}/${name}.js`,text);
//         }else{
//             for (let path of readPathName) {
//                 let text = fs.readFileSync(path).toString();
//
//                 Object.keys(config.replace).forEach( (v) => {
//                     text = config.replace[v]( text, args );
//                 })
//
//                 let fileName = getFileName(path);
//                 writeFile(`${outputPath}${name}/${fileName}`,text);
//
//                 // routePath
//                 let routePathText = fs.readFileSync('./autoTemp/temp/routePath/index.js').toString();
//
//                 Object.keys(config.replace).forEach( (v) => {
//                     routePathText = config.replace[v]( routePathText, args );
//                 })
//
//                 writeFile(`routePath/${name}.js`,routePathText);
//
//                 // routerData
//                 let routerDatahText = fs.readFileSync('./autoTemp/temp/routerData/index.js').toString();
//
//                 Object.keys(config.replace).forEach( (v) => {
//                     routerDatahText = config.replace[v]( routerDatahText, args );
//                 })
//
//                 writeFile(`routerData/${name}.js`,routerDatahText);
//             }
//         }
//
//         res();
//     })
// }
//
// let writeFile = function (filePathName,fileContent) {
//     return new Promise((res, rej) => {
//         (async function () {
//             await fs.writeFile(filePathName,
//                     fileContent, (err) => {
//                         if (err) rej(err)
//                     })
//             res('succ');
//         })()
//     })
// }
//
// async function creatCpt() {
//   try {
//       await exists();
//       await readFile(reads,outputPath);
//       await readFile(modelsPathName,modelsOutputPath);
//       return console.log(`标准页面 ${name} 创建成功。`)
//   }
//   catch (err) {
//       console.error(err);
//   }
// }
// creatCpt();
