import React from 'react';

export default class App extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            loading: true,
            cats: [],
        }
    }

    componentDidMount() {
        var url = new URL("https://api.thecatapi.com/v1/images/search");
        var params = { limit: 10 };

        url.search = new URLSearchParams(params);

        fetch(url, params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '5a86e02a-301f-48ab-8c37-900c8feb5e06'
            }
        }).then(res => res.json())
            .then(response => {
                console.log('Success:', JSON.stringify(response));
                this.setState({ loading: false, cats: response });
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        const { loading, cats } = this.state;

        const pics = cats.map(cat => <img key={cat.id} src={cat.url}/>);
        // const content = loading ? (<h1>Loading...</h1>) : pics

        return (
            <div>
                <h1>Cats</h1>
                {pics}
                {/* {content} */}
            </div>        
        )
    }
}