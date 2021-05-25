/** AUTOMATIC GENERIT ROUTE-MAP */
/** Page-route
 *  
 */
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// Automatically loads and bootstraps files
// in the "./src/components/base" folder.
const requireComponent = require.context('@/components/base', true, /\.vue$/)

for (const file of requireComponent.keys()) {
  const componentConfig = requireComponent(file)
  const name = file
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
  const componentName = upperFirst(camelCase(name))
  Vue.component(`Base${componentName}`, componentConfig.default || componentConfig)
}

const requireComponentHSX = require.context('@/components/hsx', true, /\.vue$/)

for (const file of requireComponentHSX.keys()) {
  const componentConfig = requireComponentHSX(file)
  const name = file
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
  const componentName = upperFirst(camelCase(name))
  Vue.component(`Hsx${componentName}`, componentConfig.default || componentConfig)
}

const requireComponentModal = require.context('@/components/modal', true, /\.vue$/)

for (const file of requireComponentModal.keys()) {
  const componentConfig = requireComponentModal(file)
  const name = file
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
  const componentName = upperFirst(camelCase(name))
  Vue.component(`Modal${componentName}`, componentConfig.default || componentConfig)
}

const files = require.context('@/pages', true, /\.vue$/)
const fileMap = {}
for (const rawfilePath of files.keys()) {
  const fileContent = files(rawfilePath)
  let filePath = rawfilePath
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '').toLowerCase()
  let lastSlashIndex = filePath.lastIndexOf('/')
  let fileName = null
  if (lastSlashIndex != -1) {
    fileName = filePath.slice(lastSlashIndex+1)
  }else{
    fileName = filePath
  }

  let route = {
    name: filePath,
    path: '/' + filePath,
    component: resolve => require(['@pages/' + rawfilePath.slice(2)], resolve)
  }
  let meta = null
  if (fileContent.default && fileContent.default.metaInfo) {
    meta = fileContent.default.metaInfo
    
    if (meta.group)
      route.group  = meta.group
    if (meta.public)
      route.public = meta.public
  }

  

  if (lastSlashIndex != -1) {
    route.parent = '/' + filePath.slice(0, lastSlashIndex)
    if (meta && meta.route) {
      route.parent += meta.route
      route.path = route.parent + '/' + fileName
    }
  }

  if (fileName == 'index') {
    if(route.parent){
      route.path =  route.parent
      filePath = route.parent
      if(!route.name)
        route.name = route.parent + '/index'
      route.parent = filePath.slice(0, lastSlashIndex-1)
    }
    else
      route.path = '/'

  

    if(route.parent && route.parent.includes('/')){
      let parentIndex = route.parent.lastIndexOf('/')
      route.parent = route.parent.slice(0,parentIndex)
    }else
      delete route.parent
    
  }

  

  fileMap[filePath] = route
}

export let APP_ROUTES = []
Object.keys(fileMap).forEach(k => {
  let route = fileMap[k]
  if (route.parent) {
    let parentRoute = fileMap[route.parent]
    if (!parentRoute){
      let parentIndex = route.parent.lastIndexOf('/')
      route.parent = route.parent.slice(0,parentIndex)
      parentRoute = fileMap[route.parent]
      if (!parentRoute){
        console.log('route.parent:',route)
        return
      }
    }
    if (parentRoute.children) {
      parentRoute.children.push(route)
    } else {
      if(parentRoute.path != '/core'){
      parentRoute.children = [{
          path: parentRoute.path,
          redirect: route.path
        }
        ,route
      ]
      }else{
        parentRoute.children = [route]
      }
    }
  } else {
    APP_ROUTES.push(route)
  }
})

let core = APP_ROUTES.find(v=>v.path == '/core')
let iframe = core.children.find(v=>v.path == '/core/iframecontainer')
core.redirect = core.path + '/dashboard'
core.children.push({
  component:iframe.component,
  path:'/app/:appkey'
})

console.log("ROUTES:",APP_ROUTES)



export default Vue
