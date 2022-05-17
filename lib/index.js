const { cwd } = require('process')
const { serialPromise, processPromiseFunc } = require('./utils')
/**
 * @name
 * @Date 
 * @introduction 
 * @description 
 * @param {Object} opts
 * @param {String} opts.type add、delete
 * @return {*}
 * @exception 
 */
const getShell = (type = 'add', opts = {}) => {
  const {
    gitBranch = '',
    gitAddress = '',
    reposPath = '',
    root = ''
  } = opts 
  
  const shellList = {
    add: [
      {
        shell: `git submodule add -b ${gitBranch} ${gitAddress} ${reposPath}`,
      }
    ],
    delete: [
        { shell: `git submodule deinit -f ${reposPath}`},
        { shell: `git rm -f ${reposPath}` },
        { shell: `rm -rf .git/modules/${reposPath}` }
    ]
  }
  shellList[type].forEach(item => {
    item.options = {
      cwd: root
    }
  })
  return shellList[type]
}

class Submodule {
  constructor() {}
  /**
   * @name 
   * @Date
   * @introduction 
   * @description 
   * @param {Object} opts
   * @param {String} opts.gitAddress git地址
   * @param {String} opts.gitBranch git分支
   * @param {String} opts.reposPath 存放的路径
   * @param {Function} opts.callback 回调函数
   * @return {String} 
   * @exception 
   */  
  async add(opts = {}) {
    const { 
      gitAddress = '', 
      gitBranch = '',
      reposPath = '',
      callback = () => {}
    } = opts
    const root = cwd()
    const curShell = getShell('add', {root, ...opts})
    return (async () => {
      try {
        const result = await serialPromise(processPromiseFunc(curShell, '新增子仓库'), callback)
        if (!result) {
          return ('新增成功')
        } else {
          return (result)
        }
      } catch(err) {
        throw err
      }
    })()
  }
  /**
   * @name 
   * @Date
   * @introduction 
   * @description 
   * @param {Object} opts
   * @param {String} opts.reposPath 存放路径
   * @param {Function} opts.callback 回调函数
   * @return {*}
   * @exception 
   */  
  async delete(opts = {}) {
    const { 
      reposPath = '',
      callback = () => {}
    } = opts 
    const root = cwd()
    const curShell = getShell('delete', {root, ...opts});
    return (async () => {
      try {
        const result = await serialPromise(processPromiseFunc(curShell, '删除子仓库'), callback)
        if (!result) return '删除成功'
      } catch (err) {
        throw err
      }
    })()
  }
}
module.exports = Submodule