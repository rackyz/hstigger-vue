let out = {}
const E = {
  INVALID_KEY:"缓存未正确初始化",
  INVALID_VALUE:"数值不合法",
  VALUE_NOT_FOUND:"值未找到"
}

const THROW = (exception_desc,...keys)=>{
  console.error(exception_desc,...keys)
  throw exception_desc
}


out.LocalSaveItems = (state,key,value,idkey='id')=>{
  if(!Array.isArray(state[key]))
    THROW(E.INVALID_KEY, key)
  if(!Array.isArray(value))
    THROW(E.INVALID_VALUE, key, value)
  value.forEach(item=>{
    let index = state[key].findIndex(v=>v[idkey] == item[idkey])
    if(index == -1)
      state[key].push(item)
    else
      state[key].splice(index,1,Object.assign(state[key][index],item))
  })
}


out.LocalDeleteItem = (state,key,id,idkey='id')=>{
  if (!Array.isArray(state[key]))
    THROW(E.INVALID_KEY, key)
  if ((value) == undefined)
    THROW(E.INVALID_VALUE, key, value)
  
  let index = state[key].findIndex(v => v[idkey] == id)
  if(index != -1)
    state[key].splice(index,1)
  else
    THROW(E.VALUE_NOT_FOUND, key, id)
}


export default out