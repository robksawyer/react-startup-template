import React from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select';
import request from '../../../../utils/request';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

/*
 * assuming the API returns something like this:
 *   const results = [
 *      { value: 'one', label: 'One' },
 *      { value: 'two', label: 'Two' }
 *   ]
 */
const onUpdate = (apiUrl) => (input) => {
  let options = {
    withCredentials: true,
  };
  console.log('Searching ' + input);
  return request.get(`${apiUrl}/${input}`, options)
    .then((response) => {
      // console.log(response.data.results.watches);
      return response.data.results.watches;
    })
    .then((results) => {
      console.log(results);
      // Clean up the results and make them fit the format
      // needed by the select field.
      let options = [];
      results.map((result) => {
        options.push({ value: result._id, label: result.title + '(' + result.modelNumber + ')' })
      })
      return { options: options };
    })
    .catch((res) => {
      if (res instanceof Error) {
        // In this case a request was never sent to the server
        // Something happened in setting up the request that triggered an Error
      } else {
        // Here the request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        // You will have the full response details available
        console.log(res.data); // The data that the server responded with
        console.log(res.headers); // The response headers from the server
        console.log(res.status); // The response status code
        console.log(res.config); // The config that was used to make the request
      }
    })
}

export default observer(({ field, onChange = (val:object) => { console.log(val + ' selected.') }, className = "measure" }) => (
  <div className={className}>
    <label
      htmlFor={field.id}
      className="f7 db mb2 mt3 light-silver"
    >
      {field.label}
    </label>

    <Select.Async
      {...field.bind()}
      onChange={onChange}
      loadOptions={ onUpdate(field.apiUrl)() }
    />
  </div>
));
