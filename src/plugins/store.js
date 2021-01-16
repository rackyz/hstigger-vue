let o = {}


o.UseLoading = (store)=>{
  store.state.loading = false
  store.getters.loading = state=>state.loading
  store.mutations.StartLoading = (state)=>{state.loading = true}
  store.mutations.EndLoading = (state)=>{state.loading = false}
}

o.UseList = (store,API, API_KEY, API_GROUP='core',ID_KEY="id") => {
  const ARR_KEY = API_KEY + '_ITEMS'
  const POST_KEY = `POST_${API_KEY}`
  const LIST_KEY = `LIST_${API_KEY}`
  const GET_KEY = `GET_${API_KEY}`
  const DEL_KEY = `DEL_${API_KEY}`
  const PATCH_KEY = `PATCH_${API_KEY}`
  store.state.items = []
  store.getters[ARR_KEY] = (state)=>{
    return state[ARR_KEY]
  }
  // LIST
  store.dispatch[LIST_KEY]=({commit},query)=>{
    return new Promise((resolve,reject)=>{
      API[API_GROUP][LIST_KEY]({query}).then(res=>{
        let items = res.data.data
        commit('saveItems',items)
        resolve(items)
      }).catch(reject)
    })
  }
  // GET
  store.dispatch[GET_KEY]=({commit},id)=>{
  return new Promise((resolve,reject)=>{
    API[API_GROUP][GET_KEY]({param:{id}}).then(res=>{
      let item = res.data.data
      commit('saveItem',item)
    }).catch(reject)
  })
  }
  // POST
  store.dispatch[POST_KEY] = ({
    commit
  }, data) => {
    return new Promise((resolve, reject) => {
      API[API_GROUP][POST_KEY](data).then(res => {
        commit('saveItem',data)
        resolve()
      }).catch(reject)
    })
  }
   // PATCH
    store.dispatch[PATCH_KEY] = ({
      commit
    }, data) => {
      return new Promise((resolve, reject) => {
        API[API_GROUP][PATCH_KEY]({
          param: {
            id:data.id
          },data
        }).then(res => {
          let updateInfo = res.data.data
          if(updateInfo)
            Object.assign(data,updateInfo)
          commit('saveItem', data)
          resolve(data)
        }).catch(reject)
      })
    }
    // DEL_ITEMS
     store.dispatch[DEL_KEY] = ({
       commit
     }, ids) => {
       if(Array.isArray(ids))
          return new Promise((resolve, reject) => {
            API[API_GROUP][`POSTACTION_`+API_KEY]({
              query:{
                action:'delete'
              },
              data: ids
            }).then(res => {
              commit('removeItems', ids)
              resolve()
            }).catch(reject)
          })
        else
           return new Promise((resolve, reject) => {
             API[API_GROUP][DEL_KEY]({
               param: {
                 id
               }
             }).then(res => {
               commit('removeItem', id)
               resolve()
             }).catch(reject)
           })
     }


    store.mutation.saveItems = (state,items)=>{
      o.saveItems(state,items,API_KEY)
    }
    store.mutation.saveItem = (state,item)=>{
      o.saveItem(state[ARR_KEY], item, ID_KEY)
    }
    store.mutation.removeItem = (state,id)=>{
      o.removeItem(state[ARR_KEY], id, ID_KEY)
    },
    store.mutation.removeItems = (state,ids)=>{
        o.removeItems(state[ARR_KEY], id, ID_KEY)
    }
}

// Helper functions
o.saveItems = (state,items,API_KEY)=>{
  state[API_KEY+'_items'] = items
}

o.saveItem = (arr,item,key='id')=>{
  let index = arr.findIndex(v=>v[key] == item[key])
  if(index != -1){
    arr.splice(index,1,Object.assign({},arr[index],item))
  }else{
    arr.push(item)
  }
}

o.removeItem = (arr,id,key="id")=>{
   let index = arr.findIndex(v => v[key] == id)
   if (index != -1) {
     arr.splice(index, 1)
   } else {
      throw('object is not exist:',id)
   }
}


o.patchItems  = (arr,items,key='id')=>{
   if (Array.isArray(items)){
    items.forEach(v => {
      o.saveItem(arr, item, key)
    })
   }else if(items){
     o.saveItem(arr, items, key)
   }
}

o.removeItems = (arr,ids,key="id")=>{
  if(Array.isArray(ids))
    ids.forEach(v=>{
      o.removeItem(arr,v,key)
    })
  else if(ids != undefined)
    o.removeItem(arr,ids,key)
}



export default o