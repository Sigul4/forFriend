import gql                  from "../helpers/gql"
import {actionFulfilled}      from "./actionPromise"
import actionAboutMe        from "../actions/actionAboutMe";

const actionProfilePosts = (_id) =>
async (dispatch,getState) => {
    console.log('actionProfilePosts')
    let howMuchToSkip

    const posts = getState().promise?.ProfilePosts?.payload
    posts ? howMuchToSkip = posts.length: howMuchToSkip = 0 
    
    console.log('howMuchToSkip',howMuchToSkip, posts)

    await dispatch(actionAboutMe(getState().auth.payload.sub.id))
    const gqlQuery = 
    `query PostFind($query:String){
        PostFind(query:$query){
            _id title text images{_id url} createdAt comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} directs{text} likesCount 
            owner{_id login} likes{_id owner{_id}}
            }
        }
        `
    const gqlPromise = await gql(gqlQuery, {query: JSON.stringify([{___owner: {$in: [_id]}}, {limit:[4],skip:[howMuchToSkip],sort: [{_id: -1}]}])})
    
    const action = posts ? actionFulfilled('ProfilePosts', [...posts, ...gqlPromise]) : actionFulfilled('ProfilePosts', gqlPromise) 
    await dispatch(action)
} 

export default actionProfilePosts
