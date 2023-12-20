import React, { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import { setBodyContent, setBodyContentType } from 'store/postman';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from '@mui/material';
import { padding } from '@mui/system';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

export function Body({ height }) {
  const bodyContent = useSelector((state) => state.automation.bodyContent);
  const [data, setdata] = useState([...bodyContent.fromData]);
  const bodyContentType = useSelector((state) => state.automation.bodyContentType);
  const [value, setValue] = useState(bodyContentType);
  const [rawdata, setRawData] = useState(bodyContent.raw);
  const [binaryFile, setBinaryFile] = useState(null);
  const dispatch = useDispatch();
  const [content_type, setContent_type] = useState("json");

  const handleRadioClick = (newValue) => {
    setValue(newValue);
    dispatch(setBodyContentType(newValue));
  };

  const handleCheckboxChange = (index) => {
    const newdata = [...data];
    newdata[index] = { ...newdata[index], selected: !newdata[index].selected };
    setdata(newdata);
  };

  const handleAddRow = () => {
    setdata([...data, { key: '', value: '', selected: false }]);
  };

  const handleRowChange = (index, key, value) => {
    const newdata = [...data];
    newdata[index] = { key, value, selected: newdata[index].selected, type: newdata[index].type, file: newdata[index].file };
    setdata(newdata);
  };

  const handleTypeChange = (index, type) => {
    const newdata = [...data];
    newdata[index] = { ...newdata[index], type: type, file: null };
    setdata(newdata);
  };

  const handleFileChange = (index, file) => {
    const newdata = [...data];
    newdata[index] = { ...newdata[index], file: file };
    setdata(newdata);
  };

  const hadleChangerawType = (event) => {
    setRawData({ ...rawdata, type: event.target.value });
  };

  const hadleChangerawdataText = (event) => {
    setRawData({ ...rawdata, data: event.target.value });
  };

  const handleChangeBinaryFile = (event) => {
    const file = event.target.files[0];
    setBinaryFile(file);
  };

  const handleRemoveRow = (index) => {
    const newdata = [...data];
    newdata.splice(index, 1);
    setdata(newdata);
  };

  const latestState = useRef({ fromData: data, raw: rawdata, binary: binaryFile });

  useEffect(() => {
    latestState.current = { fromData: data, raw: rawdata, binary: binaryFile };
  }, [data, rawdata, binaryFile,]);

  useEffect(() => {
    return () => {
      setTimeout(() => {

        dispatch(setBodyContent(latestState.current));
      }, 0);
    };
  }, [data, rawdata]);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const lastRow = data[data.length - 1];
    if (lastRow.key !== '' || lastRow.value !== '') {
      handleAddRow();
    }
  }, [data]);

  const radioStyle = {
    '&:checked': {
      color: '#00cca5' // Change color when selected
    },
    '&:hover': {
      color: '#00cca5' // Change color on hover
    }
  };
  return (
    <div >
      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
        <div>
          <Radio
            name="bodyType"
            checked={value === 0}
            onChange={() => handleRadioClick(0)}
            style={radioStyle}
            size="4px"
            sx={{ padding: '0px' }}
          />
          <label htmlFor="none">None</label>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Radio 
            type="radio"
            name="bodyType"
            checked={value === 1}
            onChange={() => handleRadioClick(1)}
            size="4px"
            sx={{ padding: '0px' }}
          />
          <label htmlFor="form-data">Form-Data</label>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Radio
            type="radio"
            name="bodyType"
            checked={value === 2}
            onChange={() => handleRadioClick(2)}
            size="4px"
            sx={{ padding: '0px' }}
          />
          <label htmlFor="raw">Raw</label>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Radio
            type="radio"
            name="bodyType"
            checked={value === 3}
            onChange={() => handleRadioClick(3)}
            size="4px"
            sx={{ padding: '0px' }}
          />
          <label htmlFor="binary">Binary</label>
        </div>
        {value === 2 && (
          <div>
            <FormControl>
              <Select
                labelId="select-label"
                id="select"
                value={rawdata.type}
                onChange={hadleChangerawType}
                style={{ height: '25px', fontSize: '14px' }}
                sx={{ outline: 'none', borderRadius: '0px' }}
              >
                <MenuItem style={{ fontSize: '14px' }} value="json">
                  JSON
                </MenuItem>
                <MenuItem style={{ fontSize: '14px' }} value="text">
                  Text
                </MenuItem>
                <MenuItem style={{ fontSize: '14px' }} value="html">
                  HTML
                </MenuItem>
                <MenuItem style={{ fontSize: '14px' }} value="xml">
                  XML
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
      </div>

      {value === 0 && <h3 style={{ height: height, marginTop: '1vh' }}>None</h3>}

      {value === 1 && (
        <div style={{ height: height, overflowY: 'scroll', marginTop: '1vh' }}>
          <table className="key_value_table">
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
                <tr key={index} className="params_row">
                  <td className="checkbox-cell">
                    <Checkbox
                      checked={row.selected}
                      onChange={() => handleCheckboxChange(index)}
                      sx={{ borderColor: '#787878', height: '20px' }}
                    />
                  </td>
                  <td style={{ display: 'flex', padding: '5px' }}>
                    <input
                      style={{ height: '100%', width: '100%', border: 'none' }}
                      type="text"
                      className="Key_valeu_inp"
                      value={row.key}
                      onChange={(e) => handleRowChange(index, e.target.value, row.value)}
                    />
                    <select
                      value={row.type}
                      style={{ border: 'none', outline: 'none' }}
                      onChange={(e) => handleTypeChange(index, e.target.value)}
                    >
                      <option value={'Text'}>Text</option>
                      <option value={'File'}>File</option>
                    </select>
                  </td>
                  <td>
                    {row.type === 'File' ? (
                      <div style={{ position: 'relative', width: '27.5vh' }}>
                        <input
                          style={{ position: 'absolute', height: '100%', width: '100%', border: 'none', opacity: 0 }}
                          type="file"
                          onChange={(e) => handleFileChange(index, e.target.files[0])}
                        />
                        <label
                          style={{
                            fontSize: '14px',
                            width: '100%',
                            border: 'none',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {row.file ? `File: ${row.file.name}` : 'Click to Upload File'}
                        </label>
                      </div>
                    ) : (
                      <input
                        type="text"
                        style={{ height: '100%', width: '100%', border: 'none' }}
                        value={row.value}
                        className="Key_valeu_inp"
                        onChange={(e) => handleRowChange(index, row.key, e.target.value)}
                      />
                    )}
                  </td>

                  {index !== 0 ? (
                    <td className="delete_button_row">
                      <button onClick={() => handleRemoveRow(index)} className="delete_button">
                        <DeleteIcon sx={{ height: '17px', width: '20px' }} />
                      </button>
                    </td>
                  ) : (
                    <td className="delete_button_row"></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {value === 2 && (
        <div style={{ height: height, marginTop: '1vh' }}>
          <label>
            <textarea
              value={rawdata.data}
              onChange={hadleChangerawdataText}
              style={{ width: '97%', height: height, border: 'none', outline: 'none', resize: 'none' }}
              placeholder="Enter raw data"
            ></textarea>
          </label>
        </div>
      )}

      {value === 3 && (
        <div style={{ height: height, marginTop: '5vh' }}>
          <label>
            <input onChange={handleChangeBinaryFile} type="file" />
          </label>
        </div>
      )}
    </div>
  );
}
