import gql              from "../helpers/gql"
import actionPromise    from "./actionPromise"
import actionProfileInf from "./actionProfileInf"

const actionFollow = (_id) =>
async (dispatch) => {

    const gqlQueryAllFollows = 
        `query userF($query:String){
            UserFindOne(query:$query){ 
                nick createdAt login nick avatar{url} likesCount followers{_id} following{_id}
            }
        }`

    const gqlFollowsPromise = gql(gqlQueryAllFollows, {"query": JSON.stringify([{_id:localStorage.userId}])})
        
    const preventFollows = await gqlFollowsPromise
    
    console.log('!!!!!!!!!!!!!!!!!',JSON.stringify(preventFollows))
    preventFollows.following.push({_id: _id})
    console.log(preventFollows.following)
        
    const gqlQuery = 
        `mutation setFollows($myId: String, $Id: [UserInput]){
            UserUpsert(user:{_id: $myId, following: $Id}){
                nick createdAt login nick avatar{url} likesCount followers{_id} following{_id}
            }
        }`
    await gql(gqlQuery, {"myId":localStorage.userId, "Id": preventFollows.following})
    await dispatch(actionProfileInf(_id))
}

export default actionFollow 
