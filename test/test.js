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
          gitBranch: 'master'
        }).then((res) => {
          console.log('success')
          done()
          describe('#delete()', function() {
            it('should delete without error', (deleteDone) => {
                subInstance.delete({
                  reposPath
                }).then(res => {
                  console.log('delete');
                  deleteDone()
                }, err => deleteDone(err))
            })
          })
        }, (err) => {
          done(err)
        })
      } catch(err) {
        done(err)
      }
    });
  });
  describe('#parse()', function() {
    it('respond with object', function(done) {
      const subInstance = new Submodule()
      const content = `
      [submodule "testProject"]
        path = testProject
        url = git@github.com:koajs/koa.git
        branch = master
      `;
      const contentObj = subInstance.parse(content);
      const first = Object.keys(contentObj)[0];
      const firstItem = contentObj[first];
      const hasProject = !!(first === 'testProject');
      const isKeySuccess = firstItem.path
                          && firstItem.url
                          && firstItem.branch
      if(hasProject && isKeySuccess) {
        done();
      }
    })
    
  });
  describe('#stringify()', function() {
    it('respond with string format .gitmodules file',function(done) {
      const subInstance = new Submodule()
      const modulesObj = {
        'sub/koa2': {
          path: 'sub/koa2',
          url: 'git@github.com:koajs/koa.git',
          branch: 'master'
        }
      };
      const str = subInstance.stringify(modulesObj)
      const conditions = {
        title: str.indexOf('[submodule "sub/koa2"]') > -1,
        path: str.indexOf('path = sub/koa2') > -1,
        url: str.indexOf('url = git@github.com:koajs/koa.git') > -1,
        branch: str.indexOf('branch = master') > -1
      }
      const result = Object.values(conditions).every(n => n)
      if(result) done();
    })
  })
});