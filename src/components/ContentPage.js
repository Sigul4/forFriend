import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import '../App.css';
import CreatePost from './ChangePost.js';
import InfoCard from './infoCard.js';
import Posty from './Post.js';
import PostWrapper from './PostWrapper';

function ContentPage({Post, aboutMe, onPostLoad, postLike, postUnlike}) {
    
    const [Posts, ChangePosts] = useState([])
    const [SmthToView, ChangeView] = useState('')
    const [takingData, SetTakingData] = useState(false)
    let   [howMuchToSkip, ChangeHowMuch] = useState(0)
    
    useEffect(()=>{
        onPostLoad(howMuchToSkip)
        ChangeHowMuch(howMuchToSkip => howMuchToSkip+4)
        if(!!aboutMe)SetTakingData(false)
    },[takingData])

    useEffect(()=>{
        document.addEventListener('scroll', onScroll)

        return function(){
            document.removeEventListener('scroll', onScroll)
        }
    },[])
    
    useEffect(()=>{
        if (Array.isArray(Post))ChangePosts([...Posts,...Post])
        console.log('REAL POSTS', Posts)
    },[Post])
    
    useEffect(()=>{
        if (Posts && !!aboutMe) ChangeView(Posts.map(post => <PostWrapper key={post._id} post={post} aboutMe={aboutMe} postLike={postLike} postUnlike={postUnlike} className="post"/>))
    },[Posts])


    function onScroll(e) {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1){
            SetTakingData(true)
            console.log('Экшн ПОСЛЕ СКРОЛА ')
        }
    }
    
    return (
        <List className="ContentPage">
            <div className="PostList">
                <CreatePost/>
                {SmthToView.length > 0 ? SmthToView: 
                <>
                <h1>There are no posts. <br/>Hold on brother.</h1>
                <CardMedia sx={{width: 400}}
                component="img"
                height="250"
                image="https://c.tenor.com/cSqgJbILFMkAAAAC/%D1%87%D1%82%D0%BE%D0%BF%D0%BE%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C.gif"
                alt="green iguana"
                /></>}
            </div>
            <InfoCard className="infoCard" />
        </List>
    );
}

export default ContentPage;
