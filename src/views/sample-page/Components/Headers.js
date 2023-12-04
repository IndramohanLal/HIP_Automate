import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import "./common.css";
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderData } from 'store/postman';

export function Headers(){
    const headerData = useSelector((state)=>state.automation.headerData)
    const [data, setData] = useState([
        ...headerData
    ]);
    const dispatch = useDispatch()
    const handleRowChange = (index, key, value) => {
        const newData = [...data];
        newData[index] = { key, value, selected: newData[index].selected };
        setData(newData);
    };

    
    const handleCheckboxChange = (index) => {
        const newData = [...data];
        newData[index] = { ...newData[index], selected: !newData[index].selected };
        setData(newData);
    };

    const handleAddRow = () => {
        setData([...data, { key: '', value: '', selected: false }]);
    };
    useEffect(() => {
        return () => {
            dispatch(setHeaderData(data))
        }

    }, [data])
    const handleRemoveRow = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
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

    }, [data]);

return(
    <div>
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
                                    sx={{borderColor: "#787878",height:"20px"}}
                                />
                            </td>
                            <td>
                                <input
                                    style={{ height: "100%", width: "100%", border: "none" }}
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
                                <td className='delete_button_row'>
                                    <button onClick={() => handleRemoveRow(index)} className='delete_button'><DeleteIcon  sx={{height:"17px",width:"20px"}}/></button>
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
)
}