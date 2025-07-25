import axios from "axios";

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      timeout: 10000,
      withCredentials: true,
    });
  }

  async signUp(username, email, password) {
    return this.client.post("/auth/register", { username, email, password });
  }

  async login(email, password) {
    return this.client.post("/auth/login", { email, password });
  }

  async getMe() {
    return this.client.get("/auth/me")
  }

  async createProject(name) {
    return this.client.post("/project", { name })
  }

  async getProjects() {
    return this.client.get("/project")
  }

  async deleteProject(id) {
    return this.client.delete(`/project/${id}`)
  }

  async updateProject(id,name) {
    return this.client.put(`/project/${id}`, { name })
  }

  async createTodos(title, projectId) {
    return this.client.post(`/todo`, { title,projectId })
  }
  
  async getTodos(projectId) {
    return this.client.get(`/todo/project/${projectId}`)
  }

  async UpdateTodos(id,title,completed) {
    return this.client.put(`/todo/${id}`, {title,completed});
  }

  async DeleteTodo(id) {
    return this.client.delete(`/todo/${id}`)
  }
}

export default new ApiClient()




// const ApiClient = axios.create({
//     baseURL: 'http://127.0.0.1:3000/api/v1',
//     headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//     timeout: 10000,
//     withCredentials: true,
// })

// export async function SignUp(username, email, pasword){

// }










// class ApiClient {
//     constructor(){
//         this.baseURL = 'http://127.0.0.1:3000/api/v1'
//         this.defaultHeaders = {
//             'Content-Type': 'application/json',
//             "Accept": "application/json" // dekho deta json format ei pathabe
//         }
//     }

//     async coustomFetchMethod(endpoint, options = {}){
//         try {
//             const url = `${this.baseURL}${endpoint}`
//             const headers = {...this.defaultHeaders, ...options.headers}

//             const config = {
//                 ...options,
//                 headers,
//                 credentials: 'include'
//             }

//             const resonse = await fetch(url, config)
//             const data = await resonse.json()

//             return data
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     async signup(username, email, password){
//         return this.coustomFetchMethod('/auth/register',{
//             method: 'POST',
//             body: JSON.stringify({username, email, password})
//         })
//     }
// }
