import React from "react";
import { Link } from 'react-router-dom';

class Result extends React.Component {

    render() {
        let score = this.props.match.params.score;
        let noOfqestion = this.props.match.params.noOfqestion_id;
        console.log(noOfqestion);
        return (
            <div className="result">
                <h3>You Scored</h3>
                <h4>{score}/{noOfqestion}</h4>
                <Link to='/' className="btn">Home</Link>
            </div>
        )
    }
}

export default Result;