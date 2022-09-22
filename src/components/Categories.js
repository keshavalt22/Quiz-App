import React from "react";
import { Link } from "react-router-dom";

class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            activeCategory: "",
            difficulties: "easy",
        }
    }


    componentDidMount() {
        fetch('https://opentdb.com/api_category.php')
            .then((res) => res.json())
            .then((categories) => this.setState({ categories: categories.trivia_categories }))
    }

    handleChange = ({ target }) => {
        let { name, value } = target;

        this.setState({ [name]: value });
    }


    render() {

        let category = this.state.categories;

        let difficulties = ["easy", "medium", "hard"];

        let category_id = this.state.activeCategory;
        let difficulties_id = this.state.difficulties;



        return (
            <div className="container">
                <form className="options" onSubmit={this.handleSubmit}>
                    <label htmlFor="categories"> Select Categories: </label>
                    <select id="categories"
                        onChange={this.handleChange}
                        name="activeCategory"
                        value={this.state.activeCategory}>
                        {
                            category.map(elm => {
                                return <option
                                    value={elm.id}>
                                    {elm.name}</option>
                            })
                        }
                    </select>
                    <label htmlFor="difficulties"> Select Difficulties: </label>
                    <select id="difficulties"
                        onChange={this.handleChange}
                        name="difficulties"
                        value={this.state.difficulties}>
                        {
                            difficulties.map(elm => {
                                return <option
                                    value={elm}>
                                    {elm}</option>
                            })
                        }
                    </select>
                    <Link to={`/quiz/${category_id}/${difficulties_id}`}>
                        <input type="submit" value="submit" className="submit" />
                    </Link>
                </form>
            </div>
        )


    }
}


export default Categories;