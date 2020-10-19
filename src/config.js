module.exports = {
  Servers:[{
      Name:"CORE",
      Connection: {
        baseURL: process.env.NODE_ENV == 'production' ? "https://www.nbgzpmis.xyz:10000" : 'http://localhost:5858',
        timeout: 5000,
        defaultHeaders: {
          "api-version": "v0"
        }
      },
      API: {
        // core
        LOGIN: "POST /sessions",
        WHO_IS: "GET /sessions/current",
        GET_ACCLERATES: "GET /acclerates",
        SAVE_ACCELERATES: "POST /accelerates",
        GET_USERS: "GET /users",
        GET_USER: "GET /users/:id",
        POST_USER: "POST /users",
        POST_USERS: "POST /users/create-users",
        PATCH_USER: "PATCH /users/:id",
        DEL_USER: "DELETE /users/:id",
        DEL_USERS: "POST /users/delete",
        ADD_USER_CONCERNED_PROJECT: "",

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