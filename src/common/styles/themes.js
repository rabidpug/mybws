import { css, } from 'styled-components'
const main = {
  colours: {
    complementary : '#1C9B78',
    grey          : '#968A83',
    primary       : '#ED702A',
    secondary     : '#EDA12A',
    supplementary : '#265B9B',
  },
  scrollBar: css`
    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar {
      background-color: #f5f5f5;
      width: 0.5rem;
      height: 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #555;
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  `,
}
const purple = {
  colours: {
    complementary : '#C0E428',
    grey          : '#8E848D',
    primary       : '#A11D96',
    secondary     : '#D72655',
    supplementary : '#6CD125',
  },
  scrollBar: css`
    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar {
      background-color: #f5f5f5;
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #555;
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  `,
}
const themes = {
  main,
  purple,
}

export default themes
