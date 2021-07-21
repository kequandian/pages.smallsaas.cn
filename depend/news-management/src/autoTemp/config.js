module.exports =  {
  overwrite: false,
  outputPath: './routes/',
  tempPath: './autoTemp/temp/',
  files: ['index.js'],
  modelsPathName: './autoTemp/temp/models/model.js',
  modelsOutputPath: './models/',
  replace: {
    name(text,args){
      const { name } = args;
      return text.replace(/PAGENAME_UPPERCASE/g, name.toUpperCase() ).replace(/PAGENAME/g, name);
    },
    api(text,args){
      const { API } = args;
      return text.replace(/APIADDRESS/g, API);
    }
  }
}