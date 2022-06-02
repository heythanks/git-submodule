const { cwd } = require('process')
const { serialPromise, processPromiseFunc, getBlank } = require('./utils')
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
  /**
   * @name 罗婵
   * @Date 2022-06-02 16:44:35
   * @introduction 
   * @description 
   * @param {Object} obj
   * @param {String} obj.path
   * @param {String} obj.url
   * @param {String} obj.branch
   * @return {String}
   * @exception 
   */  
  stringify(obj) {
    const modules = []
    Object.keys(obj).forEach(key => {
      const {path = '', url = '', branch = 'master'} = obj[key] ?? {}
      const itemStr = `[submodule "${path}"]\n` +
                      `${getBlank(2)}path = ${path}\n` +
                      `${getBlank(2)}url = ${url}\n` +
                      `${getBlank(2)}branch = ${branch}\n`
      modules.push(itemStr)
    })
    return modules.join("")
  }
  /**
   * @name
   * @Date
   * @introduction 
   * @description 
   * @param {String} str .gitmodules file content
   * @return {Object}
   * @exception 
   */  
  parse(str) {
    const regGitName = /\[submodule(\s+)('|")(.+)('|")\]/g;
    const regConf = /(path)(.+)|(url)(.+)|(branch)(.+)/g;
    const regGitNameList = [...str.matchAll(regGitName)];
    const regConfList = [...str.matchAll(regConf)];
    const obj = Object.create(null);
    if (!regGitNameList.length) return obj;
    regGitNameList.forEach((ele) => {
      const item = Object.create(null);
      (regConfList || []).forEach((conf) => {
        const [key = '', value = ''] = (conf[0] ?? '').split('=');
        const pureKey = key.trim();
        pureKey && (item[pureKey] = value.trim());
      });
      obj[ele[3]] = item;
    })
    return obj;
  }
  
}
module.exports = Submodule