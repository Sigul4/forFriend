import gql  from "./gql"

const newPostWithImages = async (title, text, images, _id) => {
    console.log('_id',_id)
    if(!_id){
        console.log('images',images)
        const gqlQuery = 
        `mutation newPost($text:String, $title:String, $images:[ImageInput]){
            PostUpsert(post:{title: $title, text: $text, images: $images}){
                _id, title, images{url}
            }
        }`
        const gqlPromise = gql(gqlQuery, {title, text, images})
        const action = await gqlPromise
        return action
    }
    else{
        console.log('_id',_id)
        console.log('images',images)
        const gqlQuery = 
        `mutation newPost($id:ID, $text:String, $title:String, $images:[ImageInput]){
            PostUpsert(post:{_id:$id, title: $title, text: $text, images: $images}){
                _id, title, images{url}
            }
        }`
        const gqlPromise = gql(gqlQuery, {title, text, images, id:_id})
        const action = await gqlPromise
        return action
    }
}

export default newPostWithImages
