import React from "react";
import styled from "styled-components";

export const Spinner: React.FC = () => {
  return <StyledSpinner>Loading</StyledSpinner>;
};

const StyledSpinner = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
  margin: 5rem auto;
  position: relative;
  text-indent: -9999em;
  border-top: 0.5rem solid #ccc;
  border-right: 0.5rem solid #ccc;
  border-bottom: 0.5rem solid #ccc;
  border-left: 0.5rem solid #333333;
  transform: translateZ(0);
  animation: spin 2s infinite linear;
`;

export default Spinner;
