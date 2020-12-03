var LocalServer = 'http://192.168.14.40:6001'
LocalServer = 'http://localhost:6001'
const ProductServer = 'https://api.hstigger.com'
module.exports = {
  Servers:[{
      Name:"CORE",
      Connection: {
        baseURL: process.env.NODE_ENV == 'production' ? ProductServer : LocalServer,
        timeout: 5000,
        defaultHeaders: {
          "api-version": "v0"
        }
      },
      API: {
        // public api
        DEBUG_CHANGE_USER: "POST public/sessions/debug",
        GET_LOGIN_SETTING: "GET /public/settings/login",
        SEND_VERIFY_CODE: "POST /public/sessions/forget-vcode",
        VERIFY_FORGET_VCODE: "POST /public/sessions/forget",
        CHANGE_PWD: "POST /public/sessions/changepwd",
        REGISTER: "POST /public/sessions/register",
        LOGIN: "POST /public/sessions",
        WHO_IS: "GET /public/sessions/current",


        // logined api
        GET_ACCLERATES: "GET /users/self/menus",
        SAVE_ACCELERATES: "POST /users/self/menus",
        GET_ACTIONS: "GET /users/self/action-menus",
        SAVE_ACTIONS: "GET /users/self/action-menus",
        GET_USERS: "GET /users",
        GET_USER: "GET /users/:id",
        POST_USER: "POST /users",
        POST_USERS: "POST /users/create-users",
        PATCH_USER: "PATCH /users/:id",
        DEL_USER: "DELETE /users/:id",
        DEL_USERS: "POST /users/delete",
        ADD_USER_CONCERNED_PROJECT: "",
        GET_RSS_DATA: "GET /rss/:id",
         
        GET_FILE:   "GET /files/:id",
        GET_FILES: "GET /files",
        POST_FILES: "POST /files",
        DEL_FILE: "DELETE /files/:id",
        DEL_FILES: "POST /files/delete",


        // 
        ADD_CONCERN_PROJECTS: "PATCH settings/add-concern-projects",
        DEL_CONCERN_PROJECTS: "PATCH settings/del-concern-projects",
        RESET_CONCERN_PROJECTS: "PATCH settings/reset-concern-projects"

      }
    }, {
      Name: "ADMIN",
      Connection: {
       baseURL: (process.env.NODE_ENV == 'production' ? ProductServer : LocalServer) + '/admin',
        timeout: 5000,
        defaultHeaders: {
          "api-version": "v0"
        }
      },
      API: {
        // core

        GET_ACCOUNTS: "GET /accounts",
        POST_ACCOUNTS: "POST /accounts",
        PATCH_ACCOUNT: "PATCH /accounts/:id",
        DEL_ACCOUNT: "DELETE /accounts/:id",
        DEL_ACCOUNTS: "POST /accounts/delete",
        RESET_PASSWORD: "POST /accounts/reset-pwd",
        CHANGE_PASSWORD: "POST /accounts/change-pwd",
        LOCK_ACCOUNTS: "POST /accounts/lock",
        UNLOCK_ACCOUNTS: "POST /accounts/unlock",


        GET_ENTERPRISES: "GET /enterprises",
        GET_ENTERPRISE: "GET /enterprrises",
        POST_ENTERPRISE: "POST /enterprises",
        DEL_ENTERPRISE: "DELETE /enterprises",
        PATCH_ENTERPRISE: "PATCH /enterprises/:id",
        DEL_ENTERPRISES: "POST /enterprises/delete",
        LOCK_ENTERPRISES: "POST /enterprises/lock",
        UNLOCK_ENTERPRISES: "POST /enterprises/unlock",

        GET_MODULES: "GET /modules",
        POST_MODULE: "POST /modules",
        PATCH_MODULE: "PATCH /modules/:id",
        DEL_MODULES: "POST /modules/delete",

        // RSS
        GET_RSS: "GET /rss",
        GET_RSS_DATA: "GET /rss/:id",
        POST_RSS: "POST /rss",
        PATCH_RSS: "PATCH /rss/:id",
        DEL_RSS: "POST /rss/delete",


        GET_TYPES: "GET /types",
        PATCH_TYPES: "PATCH /types/:id",
        DEL_TYPES: "DELETE /types/:id",

        // MESSAGE
        GET_MESSAGES: "GET /messages",
        READ_MEESAGE: "PATCH /messages/:id",
        // ADMIN
        GET_ROLES: "GET /roles",
        CREATE_ROLE: "POST /roles",
        DEL_ROLE: "DELTE /roles/:id",
        UPDATE_ROLE: "PATCH /roles/:id",

        GET_LOGS: "GET /logs",
        GET_LOG: "GET /logs/:id",

        GET_DUMPS: "GET /backups",
        MAKE_DUMP: "GET /tools/mysqldump",

        // PROJECT
        GET_PROJECTS: "GET /projects",
        GET_PROJECT: "GET /projects/:id",
        POST_PROJECT: "POST /projects",
        PATCH_PROJECT: "PATCH /projects/:id",
        DEL_PROJECT: "DELETE /projects/:id",

        GET_NEWS: "GET /news",

        GET_NOTICES: "GET /notices",

        GET_FILE: "GET /files/:id",
        GET_FILES: "GET /files",
        POST_FILES: "POST /files",
        DEL_FILE: "DELETE /files/:id",

        // FLOWS
        GET_FLOWS: "GET /flows",
        CREATE_FLOW: "POST /flows",
        UPDATE_FLOW: "PATCH /flows/:id",
        DEL_FLOWS: "POST /flows/delete",

      }
    }, {
     Name:"ENT",
      Connection: {
       baseURL: (process.env.NODE_ENV == 'production' ? ProductServer : LocalServer) + '/enterprise',
        timeout: 5000,
        defaultHeaders: {
          "api-version": "v0"
        }
      },
      API: {
        // core
    
        GET_ACCLERATES: "GET /users/self/menus",
        SAVE_ACCELERATES: "POST /users/self/menus",
        GET_ACTIONS: "GET /users/self/action-menus",
        SAVE_ACTIONS: "GET /users/self/action-menus",
        GET_USERS: "GET /users",
        GET_USER: "GET /users/:id",
        POST_USER: "POST /users",
        POST_USERS: "POST /users/create-users",
        PATCH_USER: "PATCH /users/:id",
        DEL_USER: "DELETE /users/:id",
        DEL_USERS: "POST /users/delete",
        ADD_USER_CONCERNED_PROJECT: "",



        // PROJECT
        GET_PROJECTS: "GET /projects",
        GET_PROJECT: "GET /projects/:id",
        POST_PROJECT: "POST /projects",
        PATCH_PROJECT: "PATCH /projects/:id",
        DEL_PROJECT: "DELETE /projects/:id",

        GET_NEWS: "GET /news",

        GET_NOTICES: "GET /notices",

        GET_FILE: "GET /files/:id",
        GET_FILES: "GET /files",
        POST_FILES: "POST /files",
        DEL_FILE: "DELETE /files/:id",

        // FLOWS
        GET_FLOWS: "GET /flows",
        CREATE_FLOW: "POST /flows",
        UPDATE_FLOW: "PATCH /flows/:id",
        DEL_FLOW: "DELETE /flows/:id",

        // 
        ADD_CONCERN_PROJECTS: "PATCH settings/add-concern-projects",
        DEL_CONCERN_PROJECTS: "PATCH settings/del-concern-projects",
        RESET_CONCERN_PROJECTS: "PATCH settings/reset-concern-projects"

      }
    },
    {
      Name:"ENT_ADMIN",
       Connection: {
         baseURL: (process.env.NODE_ENV == 'production' ? ProductServer : LocalServer) + '/entadmin',
         timeout: 5000,
         defaultHeaders: {
           "api-version": "v0"
         }
       },
       API: {
         // core
     
         LOGIN: "POST /sessions",
         WHO_IS: "GET /sessions/current",
         GET_ACCLERATES: "GET /users/self/menus",
         SAVE_ACCELERATES: "POST /users/self/menus",
         GET_ACTIONS: "GET /users/self/action-menus",
         SAVE_ACTIONS: "GET /users/self/action-menus",
         GET_USERS: "GET /users",
         GET_USER: "GET /users/:id",
         POST_USER: "POST /users",
         POST_USERS: "POST /users/create-users",
         PATCH_USER: "PATCH /users/:id",
         DEL_USER: "DELETE /users/:id",
         DEL_USERS: "POST /users/delete",
         ADD_USER_CONCERNED_PROJECT: "",
 
 
 
         // PROJECT
         GET_PROJECTS: "GET /projects",
         GET_PROJECT: "GET /projects/:id",
         POST_PROJECT: "POST /projects",
         PATCH_PROJECT: "PATCH /projects/:id",
         DEL_PROJECT: "DELETE /projects/:id",
 
         GET_NEWS: "GET /news",
 
         GET_NOTICES: "GET /notices",
 
         GET_FILE: "GET /files/:id",
         GET_FILES: "GET /files",
         POST_FILES: "POST /files",
         DEL_FILE: "DELETE /files/:id",
 
         // FLOWS
         GET_FLOWS: "GET /flows",
         CREATE_FLOW: "POST /flows",
         UPDATE_FLOW: "PATCH /flows/:id",
         DEL_FLOW: "DELETE /flows/:id",
 
         // 
         ADD_CONCERN_PROJECTS: "PATCH settings/add-concern-projects",
         DEL_CONCERN_PROJECTS: "PATCH settings/del-concern-projects",
         RESET_CONCERN_PROJECTS: "PATCH settings/reset-concern-projects"
 
       }
     }
  ],
  // cos 文件服务器
  cosServer: 'https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/'
}