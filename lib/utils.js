const child_process = require('child_process')
const chalk = require('chalk')
/**
* @name
* @Date
* @introduction
* @description 
* @param {Array} tasks 
* @return {*}
* @exception 
*/
const serialPromise = (tasks) => {
  const len = tasks.length;
  let cux = 0;
  let firstError = Object.create(null);
  return new Promise(
    (resolve1, reject1) => {
      tasks.reduce(
        (previousPromise, currentPromise) => {
          return previousPromise.then(() => {
            cux = cux + 1;
            if (Object.keys(firstError).length) return Promise.resolve()
            return currentPromise().then(result => {
                return undefined
            }).catch((err) => {
              firstError = err
              throw err
            }).finally(() => {
              if (Object.keys(firstError).length) {
                reject1(firstError)
              }
              if (len === cux) {
                resolve1()
              }
            })
          }).catch(err => {
            resolve1(err)
          })
        },
        Promise.resolve([])
      )
    }
  )
}

/**
* @name
* @Date
* @introduction  promise process
* @description 
* @param {Array} stepList shell list
* @return {*}
* @exception 
*/
const processPromiseFunc = (stepList) => {
	const fnList = stepList.map((ele, index) => {
		const step = index + 1;
    return () => new Promise((resolve, reject) => {
      child_process.exec(ele.shell, ele.options ?? {}, (...args) => {
        console.log(chalk.green(`【current executes】： ${ele.shell}`))
        const [ error, stdout, stderr] = args;
        if(error) {
          reject({
            step,
            message: args[0].message
          })
        } else {
          resolve('success')
        }
      })
    })
	})
	return fnList
}
/**
 * @name
 * @Date
 * @introduction 
 * @description 
 * @param {Number} num blank number
 * @return {String}
 * @exception 
 */
const getBlank = (num) =>  {
  return Array(num).fill(' ').join('')
}
module.exports = {
  serialPromise,
  processPromiseFunc,
  getBlank
}