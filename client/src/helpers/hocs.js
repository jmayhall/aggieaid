import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

export const  withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
}

export const  withSearchParams = (Component) => {
  return props => <Component {...props} searchParams={useSearchParams()} />;
}


