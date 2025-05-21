import React from 'react'
import {useForm} from 'react-hook-form'

function App() {
  const { register, handleSubmit, watch } = useForm();

  const send = (data) => {
    console.log(data);
  };

  console.log({ ...register('username') });

  return (
    <form onSubmit={handleSubmit(send)}>
      <select {...register('department')}>
        <option value="">Select...</option>
        <option value="hr">Human Resources</option>
        <option value="pr">Public Relations</option>
        <option value="support">Support</option>
      </select>
      <br />
      <p className="alert"></p>
      <br />
      <textarea {...register('message')} cols="30" rows="10" />
      <br />
      <input {...register('agreeToTerms')} type="checkbox" />
      I agree to the terms and conditions.
      <br />
      <button>Send</button>
      <pre>{JSON.stringify(watch())}</pre>
    </form>
  );
}


export default App;
