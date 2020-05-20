import { connect } from 'react-redux';
import Search from './search';
import { fetchSearched } from '../../actions/search_actions';

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {
    return {
        fetchSearched: (result) => dispatch(fetchSearched(result))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);