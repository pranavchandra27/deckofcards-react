import React, { Component } from "react";
import Axios from "axios";
import Card from "./Card";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await Axios.get(`${API_BASE_URL}new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    let id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}${id}/draw/`;
      let casrdRes = await Axios.get(cardUrl);
      if (!casrdRes.data.success) {
        throw new Error("No card remaining!");
      }
      console.log(casrdRes.data);
      let card = casrdRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const card = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div>
        <h1 className="Deck-title">◊ Deck of cards ◊</h1>
        <h2 className="Deck-title subtitle">
          ◊ A little demo made with react ◊
        </h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Get Card!
        </button>
        <div className="Deck-cardarea">{card}</div>
      </div>
    );
  }
}

export default Deck;
