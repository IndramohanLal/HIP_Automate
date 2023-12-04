import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { useSelector, useDispatch } from 'react-redux';
import { setParamsdata } from 'store/postman';
import { node } from 'prop-types';
import { borderColor } from '@mui/system';

const KeyValueTable = ({ setUrl, url, height }) => {
  const paramsData = useSelector((state) => state.automation.paramsdata);
  const [data, setData] = useState(JSON.parse(JSON.stringify(paramsData)));
  const dispatch = useDispatch();
  const [appendedata, setAppendedata] = useState([]);

  useEffect(() => {
    dispatch(setParamsdata(data));
  }, [data, dispatch]);

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index] = { ...newData[index], selected: !newData[index].selected };
    setData(newData);

    const selectedItem = newData[index];

    if (selectedItem.selected) {
      // If selected, append it to appendedata only if not already present
      if (!appendedata.some(item => item.key === selectedItem.key && item.value === selectedItem.value)) {
        setAppendedata([...appendedata, selectedItem]);
      }
    } else {
      // If unselected, remove it from appendedata
      const updatedAppendedata = appendedata.filter(item => !(item.key === selectedItem.key && item.value === selectedItem.value));
      setAppendedata(updatedAppendedata);
    }

    // Update URL with the new appendedata
    let oldurl;

    if (url.includes('?')) {
      oldurl = url.split('?')[0];
    } else {
      oldurl = url;
    }

    setUrl(oldurl + "?" + constructQueryString());
  };

  const handleAddRow = () => {
    setData([...data, { key: '', value: '', selected: false }]);
  };

  const handleRowChange = (index, key, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], key, value };
    setData(newData);
    let oldurl;

    if (url.includes('?')) {
      oldurl = url.split('?')[0];

      let query = constructQueryString()
      setUrl(oldurl + "?" + query);
    } else {
      return
    }
  };

  const handleRemoveRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    let oldurl = url

    if (url.includes('?')) {
      oldurl = url.split('?')[0];

      let query = constructQueryString()
      if (query.length == 0) {
        setUrl(oldurl)
        return
      }
      setUrl(oldurl + "?" + query);
    } else {
      return
    }
  };

  const constructQueryString = () => {
    const queryStringArray = data.filter(item => item.selected).map(item => `${encodeURIComponent(item.key)}=${encodeURIComponent(item.value)}`);
    const queryString = queryStringArray.join('&');
    return `${queryString}`;
  };

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const lastRow = data[data.length - 1];
    if (lastRow.key !== '' || lastRow.value !== '') {
      // If the last row is not empty, add a new empty row
      handleAddRow();
    }
    let oldurl = url

    if (url.includes('?')) {
      oldurl = url.split('?')[0];

      let query = constructQueryString()
      setUrl(oldurl + "?" + query);
    } else {
      return
    }

  }, [data, appendedata, setUrl]);

  return (
    <div style={{ height: height, overflow: "scroll" }}>
      <table className='key_value_table'>
        <thead>
          <tr>
            <th></th>
            <th>Key</th>
            <th>Value</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className='params_row'>
              <td className="checkbox-cell">
                <Checkbox
                  checked={row.selected}
                  onChange={() => handleCheckboxChange(index)}
                  className="checkbox"
                  sx={{ borderColor: "#787878", height: "20px" }}
                />
              </td>
              <td>
                <input
                  style={{ height: "100%", width: "100%", border: "none", outline: "" }}
                  type="text"
                  value={row.key}
                  className='Key_valeu_inp'
                  onChange={(e) => handleRowChange(index, e.target.value, row.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  style={{ height: "100%", width: "100%", border: "none" }}
                  value={row.value}
                  className='Key_valeu_inp'
                  onChange={(e) => handleRowChange(index, row.key, e.target.value)}
                />
              </td>
              {index !== 0 ? (
                <td className='delete_button_row' style={{ paddingLeft: "12px", paddingTop: "3px" }}>
                  <DeleteIcon onClick={() => handleRemoveRow(index)} sx={{ height: "17px", width: "20px" }} />
                </td>
              ) : (
                <td className='delete_button_row'>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeyValueTable;
