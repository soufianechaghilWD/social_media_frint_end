import React, { useState } from 'react'
import '../styles/Post.css'
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Comment from './Comment'
import { makeStyles } from '@material-ui/core/styles';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axios from '../axios'
import { useStateValue } from "./StateProvider";

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    xsmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
  }));

function Post({post}) {

    const [thepost, setThePost] = useState(post)
    const [save, setSave] = useState(false)
    const [comm, setComm] = useState('')
    const classes = useStyles();
    const [ state , dispatch] = useStateValue();
    const [like, setLike] = useState(thepost?.likes?.some(like => like._id === state?.userDB?._id))


    const rightSize = (str) => {
        if(str.length > 60){
            return str.slice(0, 57) + "... "
        }else return str
    }
    const [shownbio, stShwonBio] = useState(rightSize(thepost?.bio))
    const [plus, setPlus] = useState(false)

    const addComment = () => {
        axios.put(`/comment/add/${thepost?._id}`, {
            comment: comm,
            commenter: state?.userDB?._id 
        })
        .then((resu) => {
            setComm('')
            setThePost(resu.data[0])
        })
    }

    const addLike = () => {
        axios.put(`/post/addlike/${thepost._id}`, {
            liker: state?.userDB?._id
        })
        .then((resu) => {
            setLike(true)
            setThePost(resu.data[0])
        })
    }


    return (
        <div className="post">
            <div className="post__header">
                <Avatar className={classes.small} alt="Poster" src={thepost?.poster?.urlPic} />
                <h3>{thepost?.poster?.username?.charAt(0)?.toUpperCase() + thepost?.poster?.username?.slice(1)}</h3>
            </div>
            <div className="post__post">
                <img alt="post" src={thepost?.picUrl}/>
            </div>
            <div className="post__LCS">
                {like !== true ? <FavoriteBorderIcon onClick={addLike}/> : <FavoriteRoundedIcon className="post__LCS__liked"/> }
                <CommentIcon />
                <ShareIcon />
                {save !== true ? <BookmarkBorderIcon onClick={() => setSave(!save)} className="post__LCS__S"/> : <BookmarkIcon onClick={() => setSave(!save)} className="post__LCS__S"/>}
                <p>{thepost?.likes?.length} Likes</p>
            </div>
            <div className="post__bio">
                <div className="post__poster">
                    <h3>{thepost?.poster?.username?.charAt(0)?.toUpperCase() + thepost?.poster?.username?.slice(1)}</h3>
                </div>
                <div className="post__bio__bio">
                    <p>{shownbio} {(thepost?.bio?.length > 60 && plus === false) && <p style={{float: "right", cursor: "pointer", color: "gray", fontWeight: 700}} onClick={() => {stShwonBio(thepost?.bio); setPlus(true)}}>plus</p>}</p>
                </div>

            </div>
            <div className="post__comments">
                <h1>Comments</h1>
                {thepost?.comments?.slice(0, 3)?.map(comment => <Comment comment={comment}/>)}
                {/* <Comment /> */}
                {/* Add a comment section */}
                <div className="post__add__comment">
                    <Avatar className={classes.small} alt="Poster" src={thepost?.poster?.urlPic} />
                    <input type="text" value={comm} onChange={(e) => setComm(e.target.value)} placeholder="Add a comment..."/>
                    <button onClick={addComment} disabled={!comm} >Pulish</button>
                </div>
            </div>
        </div>
    )
}

export default Post
