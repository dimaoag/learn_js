class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl
  }

  async createPost(post){
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'post',
        body: JSON.stringify(post)
      })

      return makeResponse(request)
    } catch (e) {
      console.log(e)
    }
  }

  async getPosts(){
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'get'
      })
      return makeResponse(request)
    } catch (e) {
      console.log(e)
    }
  }

  async getPostById(id){
    try {
      const request = new Request(this.url + `/posts/${id}.json`, {
        method: 'get'
      })
      return makeResponse(request)
    } catch (e) {
      console.log(e)
    }
  }
}

async function makeResponse(request) {
  const response = await fetch(request)
  return await response.json()
}

export const apiService = new ApiService('https://basic-js-87031.firebaseio.com/')
