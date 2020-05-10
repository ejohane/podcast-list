import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { api } from "../api/api";
import { useAuth } from "../context/auth";
import { PodcastList } from "../components/PodcastList";
import { Header } from "../components/Header";
import { SortDirection, Show } from "podcast-list-models";

/**
 * The Home page.
 * 
 * This page displays a search field that allows users to query podcasts by name.
 * 
 * Results are displayed as a list below the search field.
 * 
 */
const Home = () => {

  const auth = useAuth();

  const [enableSort, setEnableSort] = useState<boolean>(false)

  const [search, setSearch] = useState<string>('')

  const [podcasts, setPodcasts] = useState<Show[]>([])


  /**
   * Search for podcasts by name.
   * 
   * @param searchValue The search criteria value
   */
  const onSearch = async (searchValue: string) => {
    setSearch(searchValue)

    if (searchValue === '') {
      setPodcasts([])
      setEnableSort(false)
      return
    }

    await getPodcasts(searchValue)

  }

  /**
   * Sort podcast results
   * 
   * @param sort Sort direction
   */
  const onSort = async (sort: SortDirection) => {
    await getPodcasts(search, sort)
  }

  /**
   * Get a list of podcasts by name
   * 
   * @param name The podcast name
   * @param sort The result sort direction
   */
  const getPodcasts = async (name: string, sort?: SortDirection) => {    
    const podcasts = await api.getPodcasts(auth.token, name, sort)
    setPodcasts(podcasts)
    setEnableSort(true)
  }

  return (
    <div>
      <Header onSearch={onSearch} enableSort={enableSort} onSortChange={onSort} />
      <PodcastList podcasts={podcasts} width="500px" />
    </div>

  );
}

export default Home;
