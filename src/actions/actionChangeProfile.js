import gql                  from "../helpers/gql"
import {actionPromise}    from "./actionPromise"
import actionAboutMe        from "../actions/actionAboutMe";

console.log('userInfo')

const actionChangeProfile = (avatar, nick) =>
async (dispatch, getState) => {
    console.log('userInfo',getState())
    let userInfo = getState().promise.aboutMe.payload

    if(!avatar) avatar = userInfo.avatar?._id
    if(!nick) nick = userInfo.nick

    const gqlQuery = 
    `  mutation setAvatar($id: String, $avatar: ID, $nick: String){
        UserUpsert(user:{_id: $id, avatar:{_id: $avatar}, nick: $nick}){
            _id login nick avatar{url}
        }
    }`

    const gqlPromise = await gql(gqlQuery, {id: userInfo._id, avatar: avatar, nick: nick })
    await gqlPromise

    await dispatch(actionAboutMe)
}

export default actionChangeProfile 
