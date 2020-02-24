import React from "react";

type HeaderProps = {
  title: string;
};

export const Header = (props: HeaderProps) => {
  const { title } = props;
  return <h2>{title}</h2>;
};
