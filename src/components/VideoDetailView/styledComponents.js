import style from 'styled-components'

export const VideoDetailViewContainer = style.div`
    background-color: ${props => props.bgColor};
    min-height: 100vh;
    margin-top: 60px;
    overflow-y: auto;
    @media screen and (min-width: 768px) {
        margin-left: 250px;
        margin-bottom: 0px;
    }
`
export const LoaderContainer = style.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`
