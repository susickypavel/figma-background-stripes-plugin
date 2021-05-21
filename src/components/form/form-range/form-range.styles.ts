import styled from "styled-components";

export const Label = styled.div`
  & > span {
    display: block;
    font-weight: bold;
  }

  & div {
    display: flex;

    & > input[type="range"] {
      flex-grow: 1;
    }

    & > input[type="number"] {
      width: 50px;
      border: 2px solid black;
      margin-left: 16px;
      border-radius: 4px;
    }
  }
`;
