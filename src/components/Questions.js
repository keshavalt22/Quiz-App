import React from "react";

class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            activeQestion: "",
        }
    }

    componentDidMount() {
        let category = this.props.match.params.category_id;
        let difficulty = this.props.match.params.difficulties_id;

        fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`)
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


    handleClick = () => {
        this.setState((prevState) => {
            return {
                activeQestion: this.state.questions
            }
        })
    }


    render() {


        let data = this.state.questions;

        return (
            <div className="center">
                {
                    data.map(elm => {
                        return (
                            <div className="box">
                                <h2>{elm.question}</h2>
                                {
                                    elm.allOptions.map(a => {
                                        return (
                                            <button value={a}
                                                onClick={this.handleClick}
                                            >{a}</button>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Questions;