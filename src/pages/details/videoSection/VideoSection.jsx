import React, { useState } from 'react'
import './style.scss'
import VideoPopup from '../../../components/videoPopup/VideoPopup'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazzyLoadImage/Img'
import { PlayIcon } from '../PlayIcon'

const VideoSection = ({ data, loading }) => {

    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)


    return (

        <div className="videoSection">
            <ContentWrapper>
                <div className="sectionHeading">
                    Official Videos
                </div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem"
                                onClick={() => {
                                    setVideoId(video.key)
                                    setShow(true)
                                }}
                            >

                                <div className="videoThumbnail">
                                    <Img src={`http://img.youtube.com/vi/${video.key}/default.jpg`} />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">
                                    {video.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="chiu">
                        Cấy ni thì chịu
                    </div>
                )}

            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}

            />
        </div>



    )
}

export default VideoSection
