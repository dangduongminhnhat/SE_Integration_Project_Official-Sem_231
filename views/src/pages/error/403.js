import React from "react";
import { Link } from "react-router-dom";
export default function Error403() {
  return (
    <div className="flex-grow">
      <h1 style={{textAlign: "center", fontSize: "2rem"}}>
        403: Fobbiden!!! <Link to='/' style={{color:"green"}}>Go Back</Link>
      </h1>
    </div>
  );
}