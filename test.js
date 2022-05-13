const Submodule = require('./lib/index')
const subInstance = new Submodule()
const isDelete = 0
isDelete && subInstance.delete({
  reposPath: 'sub/h5-demo',
  callback: () => {
    console.log(2222)
  }
}).then(res => {
  console.log(res, 'success', __filename)
}).catch(err => {
  console.log(err, 'error', __filename)
})
!isDelete && subInstance.add({
  reposPath: 'sub/h5-demo',
  gitAddress: 'git@gitee.com:heythanks/h5-demo.git',
  gitBranch: 'feature-flexible',
  callback: () => {
    console.log(3333)
  }
}).then((res) => {
  console.log(res, 'ressss')
}).catch((err) => {
  console.log(__filename, err, 'error')
})