const path = require('path')
const fs = require('fs')
const pkg = require('../package.json')

const copyFiles = () => {
  const distPath = path.join(process.cwd(), 'dist')
  const pkgJson = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    type: 'module',
    main: './index.umd.js',
    module: './index.js',
    types: './index.d.ts',
    exports: {
      '.': {
        import: './index.js',
        require: './index.umd.js',
        types: './index.d.ts'
      }
    },
    keywords: pkg.keywords,
    license: pkg.license,
    homepage: pkg.homepage,
    bugs: pkg.bugs
  }
  fs.writeFileSync(path.join(distPath, 'package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8')
  // 重命名一下
  fs.renameSync(path.join(distPath, 'index.umd.cjs'), path.join(distPath, 'index.umd.js'))
}

copyFiles()
