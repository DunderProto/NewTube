import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
 
class ReplyDelete extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            display: true
        }
 
        this.container = React.createRef();
        this.handleHideForm = this.handleHideForm.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.testClick = this.testClick.bind(this);
    }
 
    componentDidMount() {
        document.addEventListener('click', this.handleHideForm);
    }
 
    testClick() {
        console.log("YO WHATUP");
    }
 
    handleHideForm(e) {
        const current = this.container.current;
        const outside = current ? current.contains(e.target) ? false : true : false;
        if (outside === true) {
            this.setState({ display: false });
            this.props.handleHideDeleteForm();
        } 
    }
 
    handleDeleteComment() {
        // this.props.deleteComment(this.props.commentId)
        //     .then(() => this.setState({ display: false }))
        this.setState({ display: false });
        this.props.deleteComment(this.props.replyId)
            .then(() => this.props.handleDeleteCommentState())
    }
 
    render() {
        let commentDeleteComponent;
        
        if (this.state.display) {
            commentDeleteComponent = (
                <div className="comment-delete-pop-up" onClick={this.handleDeleteComment} ref={this.container}>
                    <FontAwesomeIcon className="comment-delete-pop-up-icon" icon={faTrash} />
                    <div className="comment-delete-pop-up-text">Delete</div>
                </div>
            )
        }
        return (
            <>
                {commentDeleteComponent}
            </>
        )
    }
}
 
export default ReplyDelete;
