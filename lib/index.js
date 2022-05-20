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
   * @param {String} opts.gitAddress download git address
   * @param {String} opts.gitBranch download git branch 
   * @param {String} opts.reposPath git submodule saved path
   * @return {String} 
   * @exception 
   */  
  async add(opts = {}) {
    const { 
      gitAddress = '', 
      gitBranch = '',
      reposPath = '',
    } = opts
    const root = cwd()
    const curShell = getShell('add', {root, ...opts})
    return (async () => {
      try {
        const result = await serialPromise(processPromiseFunc(curShell))
        if (!result) {
          return ('add success')
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
   * @param {String} opts.reposPath git submodule saved path
   * @return {*}
   * @exception 
   */  
  async delete(opts = {}) {
    const { 
      reposPath = '',
    } = opts 
    const root = cwd()
    const curShell = getShell('delete', {root, ...opts});
    return (async () => {
      try {
        const result = await serialPromise(processPromiseFunc(curShell))
        if (!result) return 'delete success'
      } catch (err) {
        throw err
      }
    })()
  }
}
module.exports = Submodule