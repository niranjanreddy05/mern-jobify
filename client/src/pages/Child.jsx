import { Form } from "react-router-dom";

export const action = () => {
  console.log('action performed');
  return null;
}

export default function Child() {
  return (
    <Form method='post'>
      <input name='name' type='text' ></input>
      <button>Click</button>
    </Form>
  )
}