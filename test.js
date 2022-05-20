const Submodule = require('./lib/index')
const subInstance = new Submodule()
const isDelete = 1

!isDelete && subInstance.add({
  reposPath: 'sub/koa2',
  gitAddress: 'git@github.com:koajs/koa.git',
  gitBranch: 'master'
}).then((res) => {
  console.log('successResponse', res)
}).catch((err) => {
  console.log('errorResponse', err)
})

isDelete && subInstance.delete({
  reposPath: 'sub/koa2'
}).then(res => {
  console.log(res, 'delete success')
}).catch(err => {
  console.log(err, 'delete error')
})
