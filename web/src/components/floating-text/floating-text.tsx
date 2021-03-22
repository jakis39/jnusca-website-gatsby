import { Link } from "gatsby";
import React from "react";
import { FloatingLetter } from "./floating-letter";

import * as styles from "./floating-text.module.css";

export interface FloatingTextProps {
  words: string;
  parked?: boolean;
  children?: string;
}

export const FloatingText = (props: FloatingTextProps) => {
  const { words, parked = false, children } = props;
  const [park, setPark] = React.useState<boolean>(parked);

  React.useEffect(() => {
    setPark(parked);
  }, [parked]);

  function handleMouseEnter() {
    setPark(true);
  }

  function handleMouseLeave() {
    if (!parked) {
      setPark(false);
    }
  }

  React.Children.map(children, (child, index) => {
    console.log(child, index);
  });

  const letters = [];
  for (let char of children) {
    letters.push(<FloatingLetter park={park}>{char}</FloatingLetter>);
  }

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {letters}
    </span>
  );
};
