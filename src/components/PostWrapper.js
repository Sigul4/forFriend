import React, { useState, useEffect } from "react";
import Post from "./Post";
import CreatePost from "./ChangePost.js";
import { Alert, AlertTitle, Button } from "@mui/material";

export default function PostWrapper({ post, aboutMe, postLike, postUnlike, changePostsToDelete, recoverPost}) {
    const [changer, switchChange       ] = useState(true);
    const [postData, changeData        ] = useState(post);
    const [deletedPost, changeDeletness] = useState(false)

    useEffect(() => {
        console.log("changer", changer);
    }, [changer]);

    const deletePost = () =>{
        console.log('postData',postData)
        changeDeletness(!deletedPost)
        changePostsToDelete(postData._id)
    }

    const recover = (id) =>{
        changeDeletness(!deletedPost)
        recoverPost(id)
    }

    const showData = async (data) => {
        switchChange(!changer);
        changeData(await data);
        console.log('data',data)
    };
    return (
        <>
        {!!changer ? (
            !deletedPost
                ?<Post
                    className="post"
                    userId={aboutMe._id}
                    postId={postData._id}
                    title={`${postData.title}`}
                    text={`${postData.text}`}
                    createdAt={`${postData.createdAt}`}
                    comments={postData.comments}
                    owner={postData.owner}
                    images={postData.images}
                    likes={postData.likes}
                    postLike={postLike}
                    postUnlike={postUnlike}
                    onChangePost={() => switchChange(!changer)}
                    onDeletePost={deletePost}
                />
                :<Alert style={{width: 400, margin: 40}} severity="error">
                    <AlertTitle>Post has been deleted</AlertTitle>
                    <p>if u wont to recover this one, just click here <br/>{`===>`}
                    <Button onClick={recover}><strong>Give me back my post!!!!111</strong></Button></p>
                </Alert>
        ) : (
            <CreatePost
                _id={postData._id}
                defaultTitle={postData.title}
                defaultText={postData.text}
                defaultImages={postData.images}
                onChange={showData}
                onStopChange={() => switchChange(!changer)}
            />
        )}
        {console.log('postData.images',postData)}
        </>
    );
}
