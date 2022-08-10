import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Carusel from './CaruselOfPictures';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({postId, title, text, createdAt,comments, owner, images, likes, postLike, postUnlike}) {
  const [expanded, setExpanded] = React.useState(false);

  const date = new Date(createdAt*1).toDateString()

  // console.log('owner', owner)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likesInf = Object.values(likes).map(like => {if(like.owner._id === localStorage.userId) return like._id}).filter(element => element !== undefined)
  const [statusOfLike, setStatus] = React.useState(!!likesInf.length)

  return (
    <Card sx={{ maxWidth: 500, width: "100%", marginBottom: "40px" }}  >
      <CardHeader
      
        avatar={
          <Link to={`profile/${owner._id}`} style={{color:'black',display: 'flex', alignItems:'center'}}>
            <Avatar sx={{ bgcolor: red[500] }} alt='' aria-label="recipe" src="http://pics.livejournal.com/ucmopucm/pic/000a610c"></Avatar>
            <strong><h3>{owner.login !== null ? owner.login : 'Анонимная парасятина!'}</h3></strong>
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        
        subheader={date.substr(0,30)}
        
      />
      <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* {console.log('Final Images HERE', images, !!images)} */}
        {!!images ? <Carusel images={images} /> : ''}
        <h3>
          {title === 'null' ? '': title}
        </h3>
        <Typography variant="body2" color="text.primary">
          {text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        {/* {console.log(likesInf)} */}
        {statusOfLike ? <FavoriteIcon onClick={() => {postUnlike(likesInf[0]); setStatus(!statusOfLike)}} /> : <FavoriteBorderIcon onClick={() => {postLike(postId);setStatus(!statusOfLike)}} />  }        
        
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography textAlign="left" paragraph>
            {!!comments ? comments.map(comment => <p key="comment._id">{comment.text}</p>) : ''}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
