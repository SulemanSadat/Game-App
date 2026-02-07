import React, { Component } from "react";
import GameGenres from "./gameGenres";
import { getGames } from "../services/fakeGameService";
import SearchBox from "./searchBox";
import MainGames from "./mainPage";

import image1 from "../assets/images/Action.jpg";
import image2 from "../assets/images/Metal Squad.png";
import image3 from "../assets/images/Modern Combat 4.png";
import image4 from "../assets/images/OffRoad Drive Desert.png";
import image5 from "../assets/images/Punch Boxing.png";
import image6 from "../assets/images/ScoreHero.png";
import image7 from "../assets/images/Prison break lockdown.png";
import logoImg from "../assets/images/icons8_video_game_200px.png";

class Games extends Component {
  state = {
    games: [],
    images: [image1, image2, image3, image4, image5, image6, image7],
    logo: logoImg,
    searchQuery: "",
    selectedGenre: null,
    platform: "",
    sortBy: "title",
    darkMode: true,
    loading: true,
    error: null,
  };

  componentDidMount = async () => {
    document.body.classList.toggle("dark", this.state.darkMode);

    try {
      const games = await getGames();
      this.setState({ games, loading: false });
    } catch (error) {
      this.setState({ error: "Failed to load games", loading: false });
    }
  };

  componentWillUnmount() {
    document.body.classList.remove("dark");
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null });
  };

  handlePlatformChange = (e) => {
    this.setState({ platform: e.target.value });
  };

  handleSortChange = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  toggleDarkMode = () => {
    this.setState(
      (prev) => ({ darkMode: !prev.darkMode }),
      () => document.body.classList.toggle("dark", this.state.darkMode)
    );
  };

  getFilteredGames = () => {
    const { games, searchQuery, sortBy, platform } = this.state;

    let filteredGames = [...games];

    if (searchQuery) {
      filteredGames = filteredGames.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (platform) {
      filteredGames = filteredGames.filter((game) => game.os === platform);
    }

    if (sortBy === "title") {
      filteredGames.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "version") {
      filteredGames.sort((a, b) => b.version - a.version);
    }

    return filteredGames;
  };

  render() {
    const { searchQuery, images, platform, sortBy, darkMode, loading, error, logo } =
      this.state;

    const filteredGames = this.getFilteredGames();

    if (loading) return <p className="status">Loading...</p>;
    if (error) return <p className="status error">{error}</p>;

    return (
      <div className="container">
        <div className="header">
          <img className="logo" src={logo} alt="Game logo" />

          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <label className="switch" aria-label="Toggle dark mode">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={this.toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="all">
          <div className="games-genre">
            <GameGenres games={filteredGames} images={images} />
          </div>

          <div className="main">
            <h1 className="games">Games</h1>

            <div className="filter">
              <select
                id="platform"
                className="form-control"
                value={platform}
                onChange={this.handlePlatformChange}
              >
                <option value="">All Platforms</option>
                <option value="Android">Android</option>
                <option value="IOS">iOS</option>
              </select>

              <select
                id="sortBy"
                className="form-control"
                value={sortBy}
                onChange={this.handleSortChange}
              >
                <option value="title">Title</option>
                <option value="version">Version</option>
              </select>
            </div>

            <MainGames games={filteredGames} images={images} />
          </div>
        </div>
      </div>
    );
  }
}

export default Games;
