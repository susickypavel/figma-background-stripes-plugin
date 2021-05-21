import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;

  margin: 0;

  height: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  flex-flow: row nowrap;

  & > * {
    flex-grow: 1;
  }
`;

export const FormControls = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
`;

export const FormButton = styled.button<{ variant: "primary" | "secondary" }>`
  flex-grow: 1;
  padding: 16px 0;
  font-weight: bold;
  border-radius: 4px;
  border: 2px solid black;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant == "primary" ? "#000000" : "#ffffff"};
  color: ${(props) => (props.variant == "primary" ? "#ffffff" : "#000000")};
`;
