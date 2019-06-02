import styled from "styled-components"
/*
 *
 background: ${props => props.background || props.theme.color.primary};
    background-size: cover;
    background-position: center;
    */
const StyledScreenRanking = styled.section`
  .layout {
    padding-top: 0;
    background-color: #fdfdfd;
    color: #666c71;
    padding-bottom: 80px;
  }
  main {
    padding-top: 240px;
    padding-bottom: 100px;
  }

  ._inner {
    flex: 1;
    background-color: ${props => props.theme.color.bg};
    color: ${props => props.theme.color.gray};
  }

  ._inner > p {
    margin-top: 60px;
  }

  .super {
    max-width: 782px;
    margin: 0 auto;
    b {
      font-weight: 600;
    }
  }

  p.super {
    font-weight: 300;
  }

  .month {
    color: ${props => props.theme.color.secondary};
    text-transform: uppercase;
  }

  @media (max-width: 760px) {
    main {
      padding-top: 160px;
      padding-bottom: 60px;
    }

    ._inner > p {
      margin-top: 30px;
    }
  }
`

export default StyledScreenRanking
