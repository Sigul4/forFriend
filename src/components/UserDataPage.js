import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import '../App.css';
import CreatePost from './CreatePost.js';
import Post from './Post.js';

const UserPage = ({match: {params: {_id}}, props = {}, posts = [], onLoadUserInf, onLoadUserPosts, postLike, postUnlike, onFollow, onUnfollow }) => {

    const [myPosts,    ChangePostList]   = useState([])
    let   [SmthToView, ChangeView]       = useState([])
    const [follow,     SetFollow]        = useState()
    let   [howMuchToSkip, ChangeHowMuch] = useState(0)
    const [takingData, SetTakingData] = useState(false)
    
    
    useEffect(()=>{
        console.log('Подгрузился, проверяй')
        onLoadUserInf(_id)
        onLoadUserPosts(_id,howMuchToSkip)
        ChangeHowMuch(howMuchToSkip => howMuchToSkip+4)
        SetTakingData(false)
    },[_id, takingData])
    
    
    useEffect(()=>{
        document.addEventListener('scroll', onScroll)

        return function(){
            document.removeEventListener('scroll', onScroll)
        }
    },[])

    useEffect(()=>{
        // console.log('Меняю инфй о тебе, проверяй')
        SetFollow(props?.followers?.map((follower) => follower._id === localStorage.userId).includes(true))
    },[props])
    
    useEffect(()=>{
        console.log('Меняю посты, проверяй',posts)
        if (Array.isArray(posts))ChangePostList([...myPosts,...posts])
        ChangeView(myPosts.map(post => <Post key={post._id} postId={post._id} title = {`${post.title}`} text={`${post.text}`} createdAt={`${post.createdAt}`} comments={post.comments} owner={post.owner} images={post.images} likes={post.likes} postLike={postLike} postUnlike={postUnlike} className="post"/> ))
        console.log('SmthToView, myPosts, posts',SmthToView, myPosts, posts)
    },[posts])
    

    function onScroll(e) {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1){
            SetTakingData(true)
            console.log('Экшн ПОСЛЕ СКРОЛА ')
        }
    }

        return (
            
            <Box sx={{width: "100%",display: "flex", justifyContent: "center" }}>
                <Box sx={{maxWidth: 1200}}>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://orname.ru/wp-content/uploads/2017/05/orname_ru_F009.png"
                            sx={{width: "100%"}}
                            alt="Background"
                        />
                    </Box>
                        
                    <Stack
                    sx={{padding: 1}}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={0}
                    >
                        <Box sx={{position: "relative", left:30, top:-70,width: 350, height: 100}}>                    
                            <CardHeader
                                avatar={
                                <Avatar sx={{ bgcolor: red[500],width: 100, height: 100, }} alt='' aria-label="recipe" src="http://pics.livejournal.com/ucmopucm/pic/000a610c"/>
                                }/>
                                
                            <Typography  sx={{position: "relative", left:20, top:-75}}>
                                <h2>{props.login}</h2>
                                {/* <p>{Object.values(props)[2]}</p> */}
                            </Typography>
                        </Box>
                        <Box sx={{width: 200}}>
                        {_id !== localStorage.userId? !follow ? <Button variant="contained" onClick={() => {SetFollow(!follow); onFollow(_id)}}>Subscribe</Button>: <Button variant="outlined" onClick={() => {SetFollow(!follow); onUnfollow(_id)}}>Unsubscribe</Button> :''}
                        </Box>
                        <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="baseline"
                        spacing={2}
                        >
                            {<Box><FavoriteIcon/>{props?.likesCount || 0}</Box> }
                            { <Box><SportsMartialArtsIcon/>{props?.followers?.length}</Box>}
                            {<Box><AccessibleForwardIcon/>{props?.following?.length || 0}</Box> }
                            { <Box><AccessibleForwardIcon/>{new Date(props.createdAt*1).toDateString()}</Box>}
                        </Stack>
                    </Stack>   
                            
                    <div className="PostList">
                        <CreatePost/>
                        {SmthToView}
                    </div>
                    
                </Box>
            </Box>
        )
}
export default UserPage;
