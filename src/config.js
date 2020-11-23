module.exports = {
  Servers:[{
      Name:"CORE",
      Connection: {
        baseURL: process.env.NODE_ENV == 'production' ? "https://api.hstigger.com" : 'http://localhost:6001',
        timeout: 5000,
        defaultHeaders: {
          "api-version": "v0"
        }
      },
      API: {
        // core
        GET_LOGIN_SETTING: "GET /settings/login",
        SEND_VERIFY_CODE: "POST /sessions/forget-vcode",
        VERIFY_FORGET_VCODE: "POST /sessions/forget",
        CHANGE_PWD: "POST /sessions/changepwd",
        REGISTER: "POST /sessions/register",

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
        PATCH_ENTERPRISE: "PATCH /enterprises",

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
  cosServer:'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com'
}