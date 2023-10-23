import React, { useEffect, useState } from 'react'
import "./style.scss"
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { fetchDataFromApi } from '../../utils/api'
import Select from "react-select"
import Spinner from '../../components/spinner/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard'

let filters = {};
const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Popularity Ascending" },
    { value: "primary_release_date.desc", label: "Release_Date Descending" },
    { value: "primary_release_date.asc", label: "Release_Date Ascending" },
    { value: "original_title.asc", label: "Title (A - Z)" },
]
const Explore = () => {


    const { mediaType } = useParams();

    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const [genre, setGenre] = useState(null)
    const [sortBy, setSortBy] = useState(null)
    const { data: genresData } = useFetch(`/genre/${mediaType}/list`)

    const fetchInitiaData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false)
        })
    }
    console.log("check data discover", data)

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters)
            .then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    })
                }
                else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1)
            })
    }
    console.log("check data discover next page ", data)
    useEffect(() => {
        filters = {};
        setData(null)
        setPageNum(1)

        fetchInitiaData();


    }, [mediaType])


    const onChange = (selectedItems, action) => {

        console.log("check filters", filters)
        if (action.name === "sortby") {
            setSortBy(selectedItems);
            console.log('check selectedItems sortby', selectedItems)
            console.log("check action sortby", action)
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value
            }
            else {
                delete filters.sort_by
            }
        }
        if (action.name === "genres") {
            setGenre(selectedItems)
            console.log('check selectedItems genres ', selectedItems)
            console.log("check action genres", action)
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                console.log('check genid', genreId)
                genreId = JSON.stringify(genreId).slice(1, -1)
                console.log('check genid', genreId)
                filters.with_genres = genreId
                console.log("check filters", filters)
            }
            else {
                delete filters.with_genres
            }
        }

        setPageNum(1)
        fetchInitiaData()
    }



    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name='genres'
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            placeholder="Select genres"
                            className='react-select-container genresDD'
                            classNamePrefix="react-select"
                            onChange={onChange}
                        />
                        <Select

                            name='sortby'
                            value={sortBy}

                            options={sortbyData}
                            isClearable={true}
                            placeholder="Sort By"
                            className='react-select-container sortbyDD'
                            classNamePrefix="react-select"
                            onChange={onChange}
                        />
                    </div>

                </div>

                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.results.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.mediaType === "person") return
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    )

                                })}
                            </InfiniteScroll>
                        ) : (
                            <span>Sorry , Results Not Found</span>
                        )}

                    </>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Explore
