import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => {
  React.useEffect(() => {
    console.log('wow! mounted.');
    console.log(process.argv)
  }, []);
  return <h1>Hello from {props.compiler} and {props.framework}!</h1>
};
