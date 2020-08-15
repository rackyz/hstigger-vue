const files = require.context('@/pages/apps', true, /\.vue$/)
const fileMap = {}
for (const rawfilePath of files.keys()) {
  const fileContent = files(rawfilePath)
  let filePath = rawfilePath
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
  let lastSlashIndex = filePath.lastIndexOf('/')
  let fileName = null
  if (lastSlashIndex != -1) {
    fileName = filePath.slice(lastSlashIndex+1)
  }else{
    fileName = filePath
  }

  

  let route = {
    name: fileName,
    path: '/'+filePath.toLowerCase(),
    component: resolve => require(['@pages/apps' + rawfilePath.slice(1)], resolve)
  }

  if (fileContent.default && fileContent.default.metaInfo) {
    let meta = fileContent.default.metaInfo
    if (meta.title)
      route.name = meta.title
    if (meta.group)
      route.group  = meta.group
  }


  if (lastSlashIndex != -1) {
    let parentFilePath = filePath.slice(0, lastSlashIndex)
    let parentSlashIndex = parentFilePath.lastIndexOf('/')
    if (parentSlashIndex != -1)
      route.parent = parentFilePath.slice(parentSlashIndex)
    else
      route.parent = parentFilePath
  }

  if (fileName == 'Index') {
    fileName = route.parent
    route.container = true
    delete route.parent
  }

  fileMap[fileName] = route
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
    }
  } else {
    APP_ROUTES.push(route)
  }
})

console.log('APP-ROUTES:', APP_ROUTES)

const groupMap = {
  ProjectManagement: {
    icon: 'pm2',
    name: '项目管理'
  },
  Admin:{
    icon:'desktop',
    name:'后台管理'
  }
}

Object.keys(fileMap).forEach(k => {
  let route = fileMap[k]
  if(route.container){
    route.path = route.children[0].path
  }

  let AppItem = {
    key:k,
    name:route.name,
    path:route.path
  }

  if(route.group && groupMap[route.group]){
    if (groupMap[route.group].subs)
      groupMap[route.group].subs.push(route)
    else
      groupMap[route.group].subs = [AppItem]
  }

  delete route.name
  delete route.parent
  delete route.group
})




export let APP_GROUPS = Object.values(groupMap).filter(v=>v.subs)

console.log('APP-GROUPS:', APP_GROUPS)
