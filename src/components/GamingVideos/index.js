/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/sort-comp */
/* eslint-disable import/extensions */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/no-unresolved
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import FailureView from '../FailureView'
import GameVideoCard from '../GameVideoCard'

import {
  GamingContainer,
  GamingTitleIconContainer,
  GamingVideoTitle,
  GamingVideoList,
  GamingText,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingVideos extends Component {
  state = {
    GamingVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMouth() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailURL: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        GamingVideos: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" heigth="50" width="50" />
    </LoaderContainer>
  )

  renderLoadingView = () => {
    const {GamingVideos} = this.state
    return (
      <GamingVideoList>
        {GamingVideos.map(eachVideo => (
          <GameVideoCard key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </GamingVideoList>
    )
  }

  onRetry = () => {
    this.getVideos()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderTrendingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

          return (
            <div>
              <Header />
              <NavigationBar />
              <GamingContainer data-testid="gaming" bgColor={bgColor}>
                <GamingVideoTitle>
                  <GamingTitleIconContainer>
                    <SiYoutubegaming size={35} color="#ff0000" />
                  </GamingTitleIconContainer>
                  <GamingText color={textColor}>Gaming</GamingText>
                </GamingVideoTitle>
                {this.renderTrendingVideos()}
              </GamingContainer>
            </div>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default GamingVideos
