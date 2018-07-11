import Swipeable from 'react-swipeable'
import styled from 'styled-components'

const SwipeMask = styled( Swipeable )`
  position: absolute;
  top: 0;
  left: -1.5vw;
  height: 100vh;
  width: 3vw;
  z-index: 6;
  background-color: white;
  opacity: 0.01;
`

export default SwipeMask
