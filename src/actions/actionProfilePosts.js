import gql           from "../helpers/gql"
import actionPromise from "./actionPromise"

const actionProfilePosts = (_id, howMuchToShip=0) =>
async (dispatch) => {
    const gqlQuery = 
    `query PostFind($query:String){
        PostFind(query:$query){
            _id title text images{url} createdAt comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} directs{text} likesCount 
            owner{_id login} likes{_id owner{_id}}
            }
        }
        `
    const gqlPromise = gql(gqlQuery, {query: JSON.stringify([{___owner: {$in: [_id]}}, {limit:[4],skip:[howMuchToShip],sort: [{_id: -1}]}])})
    const action = actionPromise('ProfilePosts', gqlPromise)
    await dispatch(action)
} 

export default actionProfilePosts
