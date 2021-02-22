/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const digo = require('digo');
const path = require('path');
const fs = require('fs');
const ts = require('typescript');

/** 表示一个 TypeScript 编译器 */
class TypeScriptCompiler {
  /**
   * 创建一个新的 TypeScript 编译器
   * @param compilerOptions 附加的编译选项
   * @param customTransformers 自定义语法转换器
   */
  constructor(compilerOptions = {}, customTransformers) {
    this.compilerOptions = compilerOptions = ts.fixupCompilerOptions(compilerOptions);
    compilerOptions.suppressOutputPathCheck = true;
    compilerOptions.isolatedModules = true;
    compilerOptions.allowNonTsExtensions = true;
    compilerOptions.noLib = true;
    compilerOptions.noResolve = true;
    compilerOptions.lib = null;
    compilerOptions.types = null;
    compilerOptions.noEmit = null;
    compilerOptions.noEmitOnError = null;
    compilerOptions.paths = null;
    compilerOptions.rootDirs = null;
    compilerOptions.declaration = null;
    compilerOptions.composite = null;
    compilerOptions.declarationDir = null;
    compilerOptions.out = null;
    compilerOptions.outFile = null;
    compilerOptions.outDir = null;
    this.newLine = ts.getNewLineCharacter(compilerOptions);
    this.customTransformers = customTransformers;
  }

  /**
   * 编译指定的文件并返回结果
   * @param name 要编译的文件名
   * @param source 要编译的文件内容
   */
  compile(name, source) {
    const sourceFile = ts.createSourceFile(name, source, this.compilerOptions.target);
    sourceFile.moduleName = name;
    let text;
    let sourceMap;
    const program = ts.createProgram([name], this.compilerOptions, {
      getSourceFile(fileName) {
        return fileName === ts.normalizePath(name) ? sourceFile : undefined;
      },
      // eslint-disable-next-line object-shorthand
      writeFile: function(writeFileName, content) {
        if (ts.fileExtensionIs(writeFileName, '.map')) {
          sourceMap = content;
        } else {
          text = content;
        }
      },
      getDefaultLibFileName() {
        return 'lib.d.ts';
      },
      useCaseSensitiveFileNames() {
        return false;
      },
      getCanonicalFileName(fileName) {
        return fileName;
      },
      getCurrentDirectory() {
        return '';
      },
      getNewLine: () => this.newLine,
      fileExists(fileName) {
        return fileName === name;
      },
      readFile() {
        return '';
      },
      directoryExists() {
        return true;
      },
      getDirectories() {
        return [];
      },
    });
    program.emit(undefined, undefined, undefined, undefined, this.customTransformers);
    return {
      program,
      text,
      sourceMap,
    };
  }
}

/**
 * 转译api的ts文件为js文件
 */
exports.transformApiToJs = () => {
  // eslint-disable-next-line no-var
  var t = new TypeScriptCompiler();

  function build(dir) {
    fs.readdirSync(path.resolve(process.cwd(), `${dir}`)).forEach(e => {
      if (path.parse(e).ext === '.ts') {
        fs.writeFileSync(
          path.resolve(process.cwd(), `${dir}/${path.parse(e).name}.js`),
          t.compile(
            '',
            fs
              .readFileSync(path.resolve(process.cwd(), `${dir}/${path.parse(e).name}.ts`))
              .toString(),
          ).text,
        );
      }
      if (path.parse(e).ext === '') {
        build(`${dir}/${e}`);
      }
    });
  }

  build('src/components/api'); // 转译对应地址
};

/**
 * 生成api文档
 */
exports.api = () => {
  digo
    .src('./api.json')
    .pipe(file => {
      const d = JSON.parse(file.content);
      for (let k in d.types) {
        for (let f in d.types[k].fields) {
          d.types[k].fields[f].optional = true;
        }
      }
      file.content = JSON.stringify(d);
    })
    .pipe(
      'digo-api',
      {
        apiDir: 'src/components/api/',
        docDir: 'mock/',
        mockDir: 'mock/',
        mergeDir: 'mock/',
        ajaxModule: '@/utils/request',
        dataProperty: 'data',
        messageProperty: 'message',
        successDescription: '请求成功的回调函数',
        errorDescription: '请求失败的回调函数',
      },
    )
    .dest('.')
    .then(() => {
      exports.transformApiToJs();
    });
};

// 生成API并且打开页面
exports.openApi = () => {
  digo.exec('digo api');
  digo.exec('open mock/index.html');
};
