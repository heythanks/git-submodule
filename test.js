const Submodule = require('./lib/index')
const subInstance = new Submodule()
const isDelete = 1
isDelete && subInstance.delete({
  reposPath: 'sub/koa2',
  callback: () => {
    console.log(2222)
  }
}).then(res => {
  console.log(res, 'success', __filename)
}).catch(err => {
  console.log(err, 'error', __filename)
})
!isDelete && subInstance.add({
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