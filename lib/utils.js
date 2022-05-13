const child_process = require('child_process')
/**
 * @name 罗婵
 * @Date 2022-05-13 13:39:59
 * @introduction 串行promise
 * @description 
 * @param {Array} tasks 任务列表
 * @param {Function} callback 串行成功回调
 * @return {*}
 * @exception 
 */
const serialPromise = (tasks, callback) => {
	const len = tasks.length;
	let cux = 0;
	// 某一步步骤出错后不继续往下走
	let firstError = Object.create(null);
	return new Promise(
		(resolve1, reject1) => {
      try {
        tasks.reduce(
          (previousPromise, currentPromise) => previousPromise.then(() => {
              cux = cux + 1;
              console.log(cux)
              return new Promise((resolve, reject) => {
                  currentPromise().then(result => {
                    console.log('9999')
                    resolve()
                }).catch((err) => {
                  console.log(err, '9999')
                  firstError = err
                  reject()
                }).finally(() => {
                  if (Object.keys(firstError).length) {
                    // 有出错步骤则返回出错步骤
                    reject1(firstError)
                  }
                  if (len === cux) {
                    console.log(len, '666', cux)
                    Object.prototype.toString.call(callback) === '[object Function]' && callback()
                    // 没有错误，最后执行完后返回0，与错误步骤区分
                    resolve1()
                    console.log('callback 执行')
                  }
                })
  
              })
          }),
          Promise.resolve([])
        )
      } catch (err) {
        reject1(err, 'serialPromise Error')
      }
			
		}
	)
}

/**
 * @name 罗婵
 * @Date 2022-05-13 13:37:24
 * @introduction  进程执行promise化
 * @description 
 * @param {Array} stepList 需要执行命令列表
 * @param {String} msg 错误提示
 * @return {*}
 * @exception 
 */
 const processPromiseFunc = (stepList, msg) => {
	const fnList = stepList.map((ele, index) => {
		const step = index + 1;
			return () => new Promise((resolve, reject) => {
				child_process.exec(ele.shell, ele.options ?? {}, (...args) => {
					const [ error, stdout, stderr] = args;
					if(error) {
						reject({
              step,
              message: args[0].message
            })
					} else {
						resolve('成功')
					}
				})
			})
		// }
	})
	return fnList
}
module.exports = {
  serialPromise,
  processPromiseFunc
}