import React from 'react';
import { Link } from 'react-router-dom';
import TestContainer from '../test/test_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentsContainer from '../comment/comment_index_container';
import LikesContainer from '../like/like_container';
import timeAgo from './video_time';
import Subscription from '../subscriptions/subscription_container';
import RecommendedVideosContainer from '../recommended_videos/recommended_videos_container';
import { 
    faThumbsUp, 
    faThumbsDown,
    faShare,
    faListUl,
    faEllipsisH,
    faUserCircle,
    faUser
    } from '@fortawesome/free-solid-svg-icons';

class VideoShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newVideo: false,
            subscribeToggle: false,
            showSubscribePopUp: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSubscribeToggle = this.handleSubscribeToggle.bind(this);
        this.handleStopPropagation = this.handleStopPropagation.bind(this);
        this.handleNewVidState = this.handleNewVidState.bind(this);
        this.handleSubPopUp = this.handleSubPopUp.bind(this);
        this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.addEventListener('click', this.handleSubPopUp);
        this.props.requestComments(this.props.match.params.id);
        this.props.requestVideo(this.props.match.params.id)
        .then(() => this.props.requestChannelSubscribers(this.props.video.user.id));
        
        this.props.requestVideos();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            window.scrollTo(0, 0);
            if (this.state.subscribeToggle) {
                this.props.requestChannelSubscribers(this.props.video.user.id);
                if (this.props.currentUser) {
                    this.props.requestSelfSubscriptions(this.props.currentUser.id);
                }
                this.setState({ subscribeToggle: false });
            }
    
            if (prevProps.match.params.id != this.props.match.params.id) {
                this.props.requestComments(this.props.match.params.id);
                this.props.requestVideo(this.props.match.params.id)
                .then(() => this.props.requestChannelSubscribers(this.props.video.user.id));
                this.setState({ newVideo: false });
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleSubPopUp);
    }

    handleSubPopUp(e) {
        if (this.state.showSubscribePopUp) {
            if (e.target.classList[0] == undefined) {
                if (e.target.nodeName != "H4") {
                    this.setState({ showSubscribePopUp: false });
                }
            } else if (!e.target.classList[0].includes("subscribe-pop-up")) {
                this.setState({ showSubscribePopUp: false });
            }
        }
    }

    handleClick() {
        this.setState({ newVideo: true })
    }

    handleSubscribeToggle(subscribeClass, subId) {
        if (this.props.currentUser) {
            if (subscribeClass == "subscribe") {
                this.props.subscribe({
                    channel_id: this.props.video.user.id,
                    subscriber_id: this.props.currentUser.id
                }).then(() => this.setState({ subscribeToggle: true }));
            } else if (subscribeClass == "subscribed") {
                
                this.props.unsubscribe(subId).then(() => this.setState({ subscribeToggle: true }));
            }
        } else if (!this.props.currentUser) {
            this.setState({ showSubscribePopUp: true });
        }
    }

    handleNewVidState(e) {
        if (e.target.className === "videoshow-rec-info" ||
            e.target.nodeName === "H2" ||
            e.target.nodeName === "IMG" ||
            e.target.nodeName === "SPAN" ||
            e.target.className === "videoshow-rec-views" ||
            e.target.className === "videoshow-link" ||
            e.target.className === "videoshow-index") {

            this.setState({ newVideo: true });
        }
    }

    handleRemoveVideo(e) {
        e.preventDefault();
        this.props.destroyVideo(this.props.video.id)
            .then(() => this.props.history.push("/"));
    }

    handleStopPropagation(e) {
        e.stopPropagation();
    }


    render() {

        if (this.props.video === undefined) {
            return (
                <>
                </>
            )
        }

        let commentCount = Object.values(this.props.comments).length;
        let commentWord;

        if (commentCount === 1) {
            commentWord = "Comment";
        } else {
            commentWord = "Comments";
        }
        
        let subscriberCount = 0;

        let subscribers = this.props.subscribers;

        let subscriberClass = "subscribe";
        let subscriberText = "SUBSCRIBE";
        let subscribeId;

        if (this.props.currentUser) {
            for (let k in subscribers) {
                if (this.props.currentUser.id == subscribers[k].subscriber_id) {
                    subscriberClass = "subscribed";
                    subscriberText = "SUBSCRIBED";
                    subscribeId = k;
                }
                subscriberCount++;
            }
        } else {
            for (let i in subscribers) {
                subscriberCount++;
            }
        }


        let subscriberCountName;

        subscriberCount === 1 ? subscriberCountName = "Subscriber" : subscriberCountName = "Subscribers";

        const { video } = this.props;

        

        let subscribePopUp;
        let subscribeShow;

        if (this.state.showSubscribePopUp) {
            subscribeShow = "subscribe-show";
        } else {
            subscribeShow = "";
        }

        if (!this.props.currentUser) {
            subscribePopUp = (
                <div className={`subscribe-pop-up-container ${subscribeShow}`}>
                    <div className="subscribe-pop-up-query flex-start">
                        Want to subscribe to this channel?
                    </div>
                    <div className="subscribe-pop-up-description flex-start">
                        Sign in to subscribe to this channel.
                    </div>
                    <div className="subscribe-pop-up-sign-in flex-start">
                        <Link className="subscribe-pop-up-sign-in-link" to="/login">SIGN IN</Link>
                    </div>
                </div>
            )
        }

        let videoButton;
        if (this.props.currentUser) {
            if (this.props.currentUser.id == video.user.id) {
                videoButton = (
                    <div className="videoshow-delete-video" onClick={this.handleRemoveVideo}>
                        <h4 className="videoshow-delete-video-text">DELETE VIDEO</h4>
                    </div>
                )
            } else {
                videoButton = (
                    <div className={`${subscriberClass} hover`} onClick={() => this.handleSubscribeToggle(subscriberClass, subscribeId)}>
                        { subscribePopUp }
                        <h4>{subscriberText}</h4>
                    </div>
                );
            }
        } else {
            videoButton = (
                <div className={`${subscriberClass} hover`} onClick={() => this.handleSubscribeToggle(subscriberClass, subscribeId)}>
                    { subscribePopUp }
                    <h4>{subscriberText}</h4>
                </div>
            );
        }

        const date = new Date(video.created_at);
        const dateArray = date.toDateString().split(" ").slice(1);
        dateArray[1] += ",";
        const formatted = dateArray.join(" ");
        
        return (
            <div key={video.id} className="videoshow-container">
                <div className="videoshow-left-box">
                    <div className="videoshow-player">
                        <video id="video" src={video.videoUrl} autoPlay={true} controls />
                    </div>
                    <div className="videoshow-info">
                        <div className="videoshow-title">
                            {video.title}
                        </div>
                        
                        <div className="videoshow-views-likes-options">
                            <div className="videoshow-views">
                                <h2>{video.views} { video.views == 1 ? "view" : "views"}</h2>
                                <span className="videoshow-views-dot"></span>
                                <div className="videoshow-date">
                                    <h2>{formatted}</h2>
                                </div>
                            </div>
                            
                            <div className="videoshow-likes-options">
                                <LikesContainer id={video.id} type="Video"/>
                            </div>
                        </div>
                    </div>
                    <div className="videoshow-description">
                        <div className="description-top-row">
                            <Link to={`/users/${video.user.id}`} className="description-user-link">
                                <div className="description-user-container hover">
                                    <div className="description-user-icon" style={{backgroundColor: video.user.color}}>
                                        {video.user.username[0].toUpperCase()}
                                    </div>
                                    <div className="description-user">
                                        <div className="description-username">
                                            <h2>{video.user.username}</h2>
                                        </div>
                                        <div className="description-sub-count">
                                            <h2>{subscriberCount} {subscriberCountName}</h2>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            { videoButton }
                        </div>
                        <div className="description">
                            <h2>{video.description}</h2>
                        </div>
                    </div>
                    <div className="video-comment-count">
                        {commentCount} {commentWord}
                    </div>
                    <CommentsContainer videoId={this.props.match.params.id} />
                </div>

                <div className="videoshow-right-box" onClick={this.handleNewVidState}>
                    <RecommendedVideosContainer videos={this.props.videos} />
                </div>
            </div>
        );
    }
}

export default VideoShow;