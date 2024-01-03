import { Link } from "react-router-dom";
export default function Error401() {
  return (
    <div className="flex-grow">
      <h1 style={{textAlign: "center", fontSize: "2rem"}}>
        401: You are not authenticated! Please <Link to={'/sign-in'} style={{color:"green"}}>Login</Link> to see the resource
      </h1>
    </div>
  );
}