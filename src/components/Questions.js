import React from "react";
import { Link } from 'react-router-dom';

class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: null,
            activeIndex: 0,
            correctAnswer: 0
        }
    }

    componentDidMount() {
        let category = this.props.match.params.category_id;
        let difficulty = this.props.match.params.difficulties_id;
        let noOfqestion = this.props.match.params.noOfqestion_id;

        console.log(noOfqestion);

        fetch(`https://opentdb.com/api.php?amount=${noOfqestion}&category=${category}&difficulty=${difficulty}`)
            .then((res) => res.json())
            .then((res) => {
                const questions = res.results.map(question => {
                    return {
                        ...question,
                        allOptions: question.incorrect_answers.concat(question.correct_answer).sort((a, b) => Math.random() - 0.5)
                    }
                })
                this.setState({ questions })
            });
    }

    handleNext = () => {
        this.setState({
            activeIndex: this.state.activeIndex + 1
        })
    }

    handleBack = () => {
        (this.state.activeIndex < 1) ?
            this.setState({
                activeIndex: this.state.activeIndex
            }) :
            this.setState({
                activeIndex: this.state.activeIndex - 1
            })
    }

    handleAnswer = (elm) => {
        let data = this.state.questions;

        let correctAns = data.map(elm => {
            return elm.correct_answer
        })


        if (correctAns[this.state.activeIndex] === elm) {
            this.setState({
                correctAnswer: this.state.correctAnswer + 1
            })
        } else {
            this.setState({
                correctAnswer: this.state.correctAnswer
            })
        }
    }


    render() {
        if (!this.state.questions) {
            return <h1>Loading...</h1>;
        }

        let qestionNo = this.props.match.params.noOfqestion_id;

        console.log(qestionNo);

        let data = this.state.questions;
        let allOptions = data.map(elm => {
            return elm.allOptions
        })

        return (
            <section>
                <div className="nav">
                    <Link to='/' className="btn home">Home</Link>
                    <h3 className="score">Score: <span>{this.state.correctAnswer}</span>/{this.state.activeIndex + 1}</h3>
                </div>
                <div className="center">
                    <div className="box">
                        <h2><span>{this.state.activeIndex + 1}: </span>{this.state.questions[this.state.activeIndex].question}</h2>
                        {
                            allOptions[this.state.activeIndex].map(elm => {
                                return (
                                    <button className="btn"
                                        onClick={() => this.handleAnswer(elm)}
                                    >{elm}</button>
                                )
                            })
                        }
                    </div>
                    <button className="btn" onClick={this.handleBack}>Back</button>
                    {
                        (this.state.activeIndex < qestionNo - 1) ?
                            <button className="btn" onClick={this.handleNext}>Next</button> :
                            <Link to={`/result/${this.state.correctAnswer}/${qestionNo}`}>
                                <button className="btn">Show Results</button>
                            </Link>
                    }
                </div>
            </section>
        )
    }
}

export default Questions;