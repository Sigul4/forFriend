import gql              from "../helpers/gql"
import {actionPromise}    from "./actionPromise"
import history          from "../data/history"       

const actionAboutMe = (_id) =>
async (dispatch, getState) => {
    const gqlQuery = 
    `query users($id: String){
    UserFindOne(query:$id) {
        _id nick createdAt login nick avatar{url} likesCount followers{_id nick} following{_id}
    }
}`
    const gqlPromise = gql(gqlQuery, {"id": JSON.stringify([{_id}])})
    const action =  actionPromise('aboutMe', gqlPromise)
    await dispatch(action)
    // console.log("action",JSON.stringify(getState().promise.aboutMe?.payload))
    
    if(history?.location?.pathname === '/login' ){
        // history.push("/content")
    }
}

export default actionAboutMe
