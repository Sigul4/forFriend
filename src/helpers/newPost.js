import gql  from "./gql"

const newPost = async (title, text, _id) => {
    console.log('_id',_id)
    if (!_id){
        const gqlQuery = 
        `mutation newPost($text:String, $title:String){
            PostUpsert(post:{title: $title, text :$text}){
                _id, title
            }
        }`
        const gqlPromise = gql(gqlQuery, {title, text})
        const action = await gqlPromise
        return action
    }
    else{
        console.log('_id',_id)
        const gqlQuery = 
        `mutation newPost($id:ID, $text:String, $title:String){
            PostUpsert(post:{_id:$id title: $title, text :$text}){
                _id, title
            }
        }`
        const gqlPromise = gql(gqlQuery, {id:_id, title, text})
        const action = await gqlPromise
        return action
            
    }
}

export default newPost
