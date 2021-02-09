import React, {Component} from 'react'


class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            RandomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
            error: null,
            isLoaded: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({ allMemeImgs: memes})
                })
  }

    handleChange (event) {
        const {name, value} = event.target
        this.setState({ [name] : value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ RandomImage: randMemeImg})
    }

    render() {
        const {error, isLoaded, allMemeImgs} = this.state;
        if (error) {
            return <div> Error: {error.message}</div>
        } else if (isLoaded) {
            return <div> Loading... </div>
        } else {
            return(
                <div>
                    <form className = "meme-form" onSubmit = {this.handleSubmit}>
                     <input 
                        name = "topText"
                        type = "text"
                        placeholder = "Top Text"
                        value = {this.state.topText}
                        onChange = {this.handleChange}
                        />
                     <input 
                        name = "bottomText"
                        value = {this.state.bottomText}
                        placeholder = "Bottom Text"
                        type = "text"
                        onChange = {this.handleChange}
                     />
                     <button> Generate! </button>
                    </form>
                    <div className = "meme">
                        <img src={this.state.RandomImage} alt = "" />
                        <h2 className = "top"> {this.state.topText} </h2>
                        <h2 className = "bottom"> {this.state.bottomText} </h2>
                    </div>
                </div>
            )
        }
    }
}

export default MemeGenerator
