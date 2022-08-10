import gql              from "../helpers/gql"
import actionPromise    from "./actionPromise"
import actionAboutMe    from "../actions/actionAboutMe";


const actionAllPosts = (howMuchToShip=0) =>
async (dispatch, getState) => {
        console.log('actionAllPosts')
        
        await dispatch(actionAboutMe(getState().auth.payload.sub.id))
        const state = getState()
        console.log('state.promise?.aboutMe?.payload?.following',state.promise?.aboutMe?.payload?.following)

        const arrOfFollows = state.promise?.aboutMe?.payload?.following.map(follow => follow._id)
        console.log(arrOfFollows)
        const gqlQuery = 
        `query post($query:String){
            PostFind(query:$query){
                _id title text images{url} createdAt comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} directs{text} likesCount 
                owner{_id login} likes{_id owner{_id}}
            }
        }`
        const gqlPromise = gql(gqlQuery, {"query":  JSON.stringify([{___owner: {$in: arrOfFollows}},{limit:[4],skip:[howMuchToShip],sort:[{_id:-1}]}])})
        const action     = actionPromise('AllPosts', gqlPromise) 
        await dispatch(action)
    }

export default actionAllPosts 
