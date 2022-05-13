# gitsubmodule

#### Installation
---
gitsubmodule requires node v7.6.0 or higher for ES2015 and async function support.

#### Usage
---
```
const Submodule = require('gitsubmodule');
const subInstance = new Submodule();
// delete git submodule
subInstance.delete({
  reposPath: 'sub/koa2',
  callback: () => {
    console.log(2222)
  }
}).then(res => {
  console.log(res, 'success', __filename)
}).catch(err => {
  console.log(err, 'error', __filename)
});
// add git submodule
subInstance.add({
  reposPath: 'sub/koa2',
  gitAddress: 'git@github.com:koajs/koa.git',
  gitBranch: 'master',
  callback: () => {
    console.log(3333)
  }
}).then((res) => {
  console.log(__filename, res, 'ressss')
}).catch((err) => {
  console.log(__filename, err, 'error')
})
```




