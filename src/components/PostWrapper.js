import React, { useState, useEffect }   from 'react';
import Post                             from './Post';
import CreatePost                       from './ChangePost.js';

export default function PostWrapper({post, aboutMe, postLike, postUnlike}) {

    const [changer, switchChange] = useState(true)

    useEffect(()=>{
        console.log("changer",changer)
    },[changer])

    return (
        <>
            {!!changer 
                ? <Post  className='post' key={post._id} userId={aboutMe._id} postId={post._id} title = {`${post.title}`} text={`${post.text}`} createdAt={`${post.createdAt}`} comments={post.comments} owner={post.owner} images={post.images} likes={post.likes} postLike={postLike} postUnlike={postUnlike} onChangePost={() => switchChange(!changer)} />
                : <CreatePost _id={post._id} defaultTitle={post.title} defaultText={post.text} defaultImages={post.images} onStopChange={() => switchChange(!changer)} />
            }
        </>
    )
}
