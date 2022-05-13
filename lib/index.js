const { cwd } = require('process')
const { serialPromise, processPromiseFunc } = require('./utils')
/**
 * @name 罗婵
 * @Date 2022-05-13 13:29:17
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
   * @name 罗婵
   * @Date 2022-05-13 11:30:36
   * @introduction 
   * @description 
   * @param {Object} opts
   * @param {String} opts.gitAddress git地址
   * @param {String} opts.gitBranch git分支
   * @param {String} opts.reposPath 存放的路径
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
    return new Promise(async (resolve, reject) => {
      try {
        const result = await serialPromise(processPromiseFunc(curShell, '新增子仓库'), callback)
        if (!result) {
          resolve('新增成功')
        } else {
          reject(result)
        }
      } catch(err) {
        reject(err)
      }
    })
  }
  /**
   * @name 罗婵
   * @Date 2022-05-13 11:41:58
   * @introduction 
   * @description 
   * @param {*} opts
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
    return new Promise(async (resolve, reject) => {
      try {
        const result = await serialPromise(processPromiseFunc(curShell, '删除子仓库'), callback)
        if (!result) resolve('删除成功')
      } catch (err) {
        reject(err)
      }
    })
    
  }
}
module.exports = Submodule