import styled from "styled-components";

export const Label = styled.label<{ centered: boolean }>`
  ${(props) => (props.centered ? "text-align: center;" : "")}

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

export const Description = styled.p`
  font-size: 11px;
  color: gray;
  margin: 4px 0;
`;
