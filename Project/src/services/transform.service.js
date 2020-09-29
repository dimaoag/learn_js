export class TransformService {
  static transformPosts (data){
    return Object.keys(data).map(key => {
      return {
        ...data[key],
        id: key
      }
    })
  }
}
