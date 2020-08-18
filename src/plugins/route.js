/** AUTOMATIC GENERIT ROUTE-MAP */

/** Page-route
 *  
 */
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
    name: fileName,
    path: '/' + filePath,
    component: resolve => require(['@pages/' + rawfilePath.slice(2)], resolve)
  }

  if (fileContent.default && fileContent.default.metaInfo) {
    let meta = fileContent.default.metaInfo
    
    if (meta.title)
      route.name = meta.title
    if (meta.group)
      route.group  = meta.group
    if (meta.public)
      route.public = meta.public
  }

  if (lastSlashIndex != -1) {
    route.parent = filePath.slice(0, lastSlashIndex)
  }

  if (fileName == 'index') {
    if(route.parent){
      route.path = '/'+route.parent
      filePath = route.parent
    }
    else
      route.path = '/'

    if(route.parent &&route.parent.includes('/')){
      let parentIndex = route.parent.lastIndexOf('/')
      route.parent = route.parent.slice(0,parentIndex)
    }else
      delete route.parent
    
  }
  console.log(filePath, fileName,route)
  fileMap[filePath] = route
}

export let APP_ROUTES = []
Object.keys(fileMap).forEach(k => {
  let route = fileMap[k]
  if (route.parent) {
    let parentRoute = fileMap[route.parent]
    if (!parentRoute)
      throw ('APP-Parent is not exist:' + route.parent)
    if (parentRoute.children) {
      parentRoute.children.push(route)
    } else {
      parentRoute.children = [route]
      parentRoute.redirect = route.path
    }
  } else {
    APP_ROUTES.push(route)
  }
})

console.log('APP-ROUTES:', APP_ROUTES)
