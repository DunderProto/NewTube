import React from 'react';
import ResultsItem from './results_item';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: this.props.location.search.slice(14).split("+").join(" "),
            searched: false
        };

        this.handleURL = this.handleURL.bind(this);
    }

    componentDidMount() {
        this.props.fetchSearched(this.state.result);
    }

    componentDidUpdate() {
        this.handleURL();
        if (this.state.searched) {
            this.props.fetchSearched(this.state.result);
            this.setState({ searched: false });
        }
    }

    handleURL() {
        let query = this.props.location.search.slice(14).split("+").join(" ");
        if (query != this.state.result) {
            this.setState({ result: query });
            this.setState({ searched: true });
        }
    }

    render() {
        if (this.props.videos === undefined) {
            return (
                <></>
            )
        }

        return (
            <>
                <div className="results-container">
                    <div className="results-for-input">
                        RESULTS FOR "{this.state.result}"
                    </div>
                    <div className="results-videos">
                        {this.props.videos.map(video => {
                            return (
                                <div key={video.id}>
                                    <ResultsItem video={video} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default Results;