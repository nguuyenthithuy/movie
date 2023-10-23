import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiconfiguration, getGenres } from './store/homeSlice'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResults from './pages/searchResult/SearchResults'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/pageNotFound'



function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) =>
    state.home)

  console.log('check url', url)

  useEffect(() => {
    apiConfig();
    genresCall();
  }, [])

  const apiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log('check res', res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",

        profile: res.images.secure_base_url + "original",
      }
        ;
      dispatch(getApiconfiguration(url));
    })
  }

  const genresCall = async () => {
    let promises = []
    let endPoint = ["tv", "movie"]
    let allGenres = {}

    endPoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))

    })

    const data = await Promise.all(promises)

    console.log('check data genres', data)
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })

    console.log('check all genres', allGenres)

    dispatch(getGenres(allGenres))


  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
