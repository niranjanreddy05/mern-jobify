import { Outlet } from "react-router-dom";


export const loader = ({ request }) => {
  console.log(request.method);
  console.log('re rendered');
  return null;
}

export default function Parent() {
  return (
    <>
      <h1>Parent</h1>
      <Outlet />
    </>
  )
}