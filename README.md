# git-submodule

#### Installation
---
git-submodule requires node v7.6.0 or higher for ES2015 and async function support.
```
yarn add git-submodule
```

#### Usage
---
```
const Submodule = require('git-submodule');
const subInstance = new Submodule();
// delete git submodule
subInstance.delete({
  reposPath: 'sub/koa2',
}).then(res => {
  console.log('git submodule delete success', res)
}).catch(err => {
  console.log('git submodule delete fail', err)
});

// add git submodule
subInstance.add({
  reposPath: 'sub/koa2',
  gitAddress: 'git@github.com:koajs/koa.git',
  gitBranch: 'master',
}).then((res) => {
  console.log('git submodule add success', res)
}).catch((err) => {
  console.log('git submodule add fail', err)
})
```

#### License
---
Licensed under MIT



