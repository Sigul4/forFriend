import Drop from './DropZone.js'
import { Card } from '@mui/material';
import Input from '@mui/material/Input'; 
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import { createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk'; 
import { Provider, connect } from "react-redux";
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState, useSyncExternalStore } from 'react';

const getGQL = url =>
(query, variables = {}) =>
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {}),
            Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.data) {
                return Object.values(data.data)[0];
            } else throw new Error(JSON.stringify(data.errors));
        });

const URL = `http://hipstagram.node.ed.asmer.org.ua/`

const gql = getGQL(`${URL}graphql`)

const actionUnloadFile = async (file) =>{
        console.log('иде')
        // console.log(file)
        const uploadFile = async (file) => {
            const url = `http://hipstagram.node.ed.asmer.org.ua/upload`
            let formData = await new FormData()
            formData.append('photo', file);
            return fetch(url, {
                        method: "POST",
                        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
                        body: formData
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log('ready data',data)
                        return data
                    })
        }
        console.log(await Promise.all(file.map(file => uploadFile(file))).then(values => {return values}))
        return await Promise.all(file.map(file => uploadFile(file))).then(values => {return values})    
}

const actionPostInf = async (_id) => {
    const gqlQuery = 
    `query PostFind($query:String){
        PostFind(query:$query){
                _id title text images{url} createdAt comments{text} directs{text} likesCount owner{login} likes{owner{login,nick}}
            }
        }
        `
    const gqlPromise = gql(gqlQuery, {query: JSON.stringify([{_id:{$in:["5d88b380ec127f6fede73f08"]}},{sort:[{_id:-1}]}])})
    const action = await gqlPromise
    return action
}


const actionNewPost = async (title, text) => {
    const gqlQuery = 
    `mutation newPost($text:String, $title:String){
        PostUpsert(post:{title: $title, text :$text}){
            _id, title
        }
    }`
    const gqlPromise = gql(gqlQuery, {title, text})
    const action = await gqlPromise
    return action
}

const actionNewPostWithImages = async (title, text, images) => {
    console.log('images',images)
    const gqlQuery = 
    `mutation newPost($text:String, $title:String, $images:[ImageInput]){
        PostUpsert(post:{title: $title, text: $text, images: $images}){
            _id, title, images{url}
        }
    }`
    const gqlPromise = gql(gqlQuery, {title, text, images})
    const action = await gqlPromise
    return action
}


export default function CreatePost ({_id, defaultImaages = [], valueOfLoadingPicture, actionBackToStart}){
    
    const [images, ChangeImages] = useState(defaultImaages)
    const [imagesIds, ChangeImagesIds] = useState(defaultImaages)
    
    const [title, ChangeTitle] = useState('')
    const [text, ChangeText] = useState('')

    useEffect(()=>{
        console.log(images)
    },[images])

    return (
            <Card sx={{textAlign: "left", padding: "40px", marginBottom: "20px"}}>
                <form>
                    <Input 
                        sx={{width: "100%", marginBottom: "10px"}} 
                        placeholder='Title' 
                        onChange = {(e) => ChangeTitle(title => title = e.target.value)}
                        value={title}
                    />
                    <TextField
                        sx={{width: '100%', margin: '20px 0'}}
                        id="standard-multiline-static"
                        multiline
                        rows={3}
                        variant="standard"
                        placeholder="Post text"
                        onChange = {(e) => ChangeText(text => text = e.target.value)}
                        value={text}
                        />
                    <Drop imageData={(image) => {
                        console.log('!!!!!',image)
                        ChangeImages(prevArray => prevArray.concat(image.map((img) => {return {url: `${URL}${img.url}`}})))
                        ChangeImagesIds(prevArray => prevArray.concat(image.map((img) => {return {_id: img._id}})))
                        }} onUpload={actionUnloadFile}/>
                    <div style={{display: "flex"}}>
                        {Array.isArray(images) ? images.map((image, index) => 
                            <CardMedia
                                // onClick={ChangeImagesIds(images => images.filter())}
                                component="img"
                                height="50px"
                                width ="50px"
                                image={image.url}
                                sx={{width: "10%"}}
                            />) : ''}
                    </div>
                    {/* Select images: {images.length}{console.log('imagesssss',images, imagesIds)} */}
                    {/* <Button onClick={()=>{}}><h3>Drop to start values</h3></Button> */}
                    <Button onClick={() => images.length = 0 ? actionNewPost(title, text) : actionNewPostWithImages(title, text, imagesIds)}><h3>Add post</h3></Button>
                </form> 
            </Card>
    )
}
