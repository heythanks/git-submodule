var assert = require('assert');
const Submodule = require('../lib/index')

describe('Submodule', function() {
  describe('#add()', function() {
    it('should add without error', function(done) {
      const subInstance = new Submodule()
      const reposPath = 'sub/koa2'
      try {
        subInstance.add({
          reposPath,
          gitAddress: 'git@github.com:koajs/koa.git',
          gitBranch: 'master',
          callback: () => {
            console.log('add')
            done()
            describe('#delete()', function() {
              it('should delete without error', (deleteDone) => {
                try {
                  subInstance.delete({
                    reposPath,
                    callback: () => {
                      console.log('delete')
                      deleteDone()
                    }
                  })
                } catch(err) {
                  deleteDone(err)
                }
              })
            })
          }
        })
      } catch(err) {
        done(err)
      }
    });
  });
});