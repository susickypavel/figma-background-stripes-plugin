import styled from "styled-components";

export const Label = styled.label`
  & > span {
    font-weight: bold;
    display: block;
    margin-bottom: 4px;
  }

  & > input[type="number"] {
    padding: 8px;
    border: 2px solid black;
    border-radius: 4px;

    width: 100%;
  }
`;
