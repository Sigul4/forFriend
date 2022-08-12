import { Avatar, Paper } from "@mui/material";
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';



export default function Comments({comments, postId}){
    console.log('comments',comments)
    
    return (
            <>
            <h3>Comments: </h3>
                {comments.map(comment => 
                
                        <Paper style={{color:'black',display: 'flex',justifyContent:'space-between', alignItems:'center', padding:5}} elevation={3}>
                            <Link to={`profile/${comment.owner._id}`} style={{color:'black',display: 'flex', alignItems:'center'}}>
                                <Avatar sx={{ bgcolor: red[500] }} alt='' aria-label="recipe" src="http://pics.livejournal.com/ucmopucm/pic/000a610c"></Avatar>
                                <strong><h3>{comment.owner.login !== null ? comment.owner.login : 'Анонимная парасятина!'}</h3></strong>
                            </Link>
                            
                            <strong style={{margin:10}}>{comment.text}</strong>
                            <p style={{color:'gray'}}>{new Date(comment.createdAt*1).toDateString().substr(0,30)}</p>
                        </Paper>
                )}
                
            </>
        )
}
