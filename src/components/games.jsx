import React, { Component } from "react";
import GameGenres from "./gameGenres";
import { getGames } from "../services/fakeGameService";
import { getGenres } from "../services/fakeGenreService";
import SearchBox from "./searchBox";
import MainGames from "./mainPage";
import image1 from "../assets/images/Action.jpg";
import image2 from "../assets/images/Metal Squad.png";
import image3 from "../assets/images/Modern Combat 4.png";
import image4 from "../assets/images/OffRoad Drive Desert.png";
import image5 from "../assets/images/Punch Boxing.png";
import image6 from "../assets/images/ScoreHero.png";
import image7 from "../assets/images/Prison break lockdown.png";
import logo from "../assets/images/icons8_video_game_200px.png";

class Games extends Component {
  state = {
    games: [],
    images: [image1, image2, image3, image4, image5, image6, image7],
    logo: logo,
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    platform: "",     // Stores the selected platform (Android or iOS)
    sortBy: "title",  // Default sorting by title
    darkMode: false,  // Tracks whether dark mode is enabled
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      // Simulate loading
      const games = await getGames();
      const images = this.state.images;
      this.setState({ games, images, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to load games', loading: false });
    }
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
    this.setState({ darkMode: !this.state.darkMode });
  };

  getFilteredGames = () => {
    const { games, searchQuery, sortBy, platform } = this.state;

    let filteredGames = games;

    // Filter by search query
    if (searchQuery) {
      filteredGames = filteredGames.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by platform (Android or iOS)
    if (platform) {
      filteredGames = filteredGames.filter((game) => game.os === platform);
    }

    // Sort the games based on selected sorting criteria
    if (sortBy === "title") {
      filteredGames = filteredGames.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortBy === "version") {
      filteredGames = filteredGames.sort((a, b) => b.version - a.version);
    }

    return filteredGames;
  };

  render() {
    const { searchQuery, images, platform, sortBy, darkMode, loading, error, games } = this.state;
    const filteredGames = this.getFilteredGames();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Toggle class based on dark mode
    const containerClass = darkMode ? "container dark-mode" : "container";
    const headerClass = darkMode ? "header dark-header" : "header";

    return (
      <div className={containerClass}>
        <div className={headerClass}>
          <img className="logo" src={logo} alt="img" />
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          {/* Dark Mode Toggle */}
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={this.toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="all">
          <GameGenres games={filteredGames} images={images} />

          <div className="main">
            <h1 className="games">Games</h1>
            <div className="filter">
              {/* Platform selection */}
              <label htmlFor="platform"></label>
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

              {/* Sorting selection */}
              <label htmlFor="sortBy"></label>
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
