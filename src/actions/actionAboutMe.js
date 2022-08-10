import gql              from "../helpers/gql"
import actionPromise    from "./actionPromise"

const actionAboutMe = (_id, history) =>
async (dispatch) => {
    const gqlQuery = 
    `query users($id: String){
    UserFindOne(query:$id) {
        nick createdAt login nick avatar{url} likesCount followers{_id nick} following{_id}
    }
}`
    const gqlPromise = gql(gqlQuery, {"id": JSON.stringify([{_id}])})
    const action =  actionPromise('aboutMe', gqlPromise)
    await dispatch(action)
    
    if(history?.location?.pathname === '/login' ){
        history.push("/content")
    }
}

export default actionAboutMe
