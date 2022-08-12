import gql from '../helpers/gql.js';
import actionPromise from './actionPromise.js';

const actionPostInf = (_id) => 
async (dispatch) =>{
    const gqlQuery = 
    `query PostFind($query:String){
        PostFind(query:$query){
                _id title text images{url} createdAt comments{text} directs{text} likesCount owner{login} likes{owner{login,nick}}
            }
        }`

    const gqlPromise = gql(gqlQuery, {query: JSON.stringify([{_id:{$in:[_id]}},{sort:[{_id:-1}]}])})
    const action     = actionPromise('changedPost', gqlPromise) 
    await dispatch(action)
    }

export default actionPostInf
