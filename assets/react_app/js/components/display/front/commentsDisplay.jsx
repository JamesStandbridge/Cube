import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentForm from "../../form/app/commentForm";
import CustomModal from "../../modals/Modal";
import {Card, CardActions, CardContent, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";

require("../../../../css/resource.css");
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
const CommentsDisplay = ({resourceId, catchRefresh}) => {

    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getCommmentsResource(resourceId);
            console.log(res);
            const newComment = res.data["hydra:member"];
            setComments(newComment);
        }
        init()

    }, [catchRefresh])

    const [ comments, setComments ] = useState([])
    const classes = useStyles();

    const viewComment=(comment)=> {
        return(
            <Card key={comment.id} className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Commenté le {format(Date.parse(comment.createdAt), "d MMM yyyy")} par {comment.userEntity.firstname}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {comment.content}
                    </Typography>
                </CardContent>
                <CardActions>
                   
                </CardActions>
            </Card>
        )
    }
    function isParentResponseComment(comment, parentId) {
        if (comment.parentComment === null) {
            return viewComment(comment)
        } else if (comment.parentComment){
            if (comment.parentComment.id === parentId) {
                return viewComment(comment)
            }
        }
    }

    return (
        <div>
            {console.log('RENDER', comments )}
            <p>Il y a {comments.length} commentaires : </p>
            {
                comments.map(comment => (
                    <div key={comment.id}>
                        <Card key={comment.id} className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Commenté le {format(Date.parse(comment.createdAt), "d MMM yyyy")} par {comment.userEntity.firstname}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {comment.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        
                        </CardActions>
                    </Card>
                    </div>
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(CommentsDisplay)