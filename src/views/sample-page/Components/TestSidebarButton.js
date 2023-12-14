import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Editor from '@monaco-editor/react';
import { setGenraetedTest } from '../../../store/postman';
import CircularProgress from '@mui/material/CircularProgress';//Indra
import axios from "axios";

const TestSideBarButton = () => {
    const dispatch = useDispatch();
    const test_code = useSelector((state) => state.automation.genratedTest);
    const [code, setCode] = useState(test_code.trim());
    const [loading, setLoading] = useState(true);//Indra

    const handleChangeEditor = (newCode) => {
        const modifiedCode = newCode.trim();
        setCode(modifiedCode);

        dispatch(setGenraetedTest(modifiedCode));
    };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             setLoading(true);

  //             const response = await axios.post("your_api_endpoint", {
  //                 test_code: test_code,
  //             });

  //             const responseData = await response.json();

  //             const modifiedCode = responseData.code.trim();
  //             setCode(modifiedCode);
  //             dispatch(setGenraetedTest(modifiedCode));

  //             setLoading(false);
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //             setLoading(false);
  //         }
  //     };

  //     fetchData();
  // }, [dispatch]);

    return (
        <div className="editor-container" style={{ height: '100vh', width: '100vw', overflowX: 'hidden' }}>
            <Editor
                width="100%"
                height="100%"
                defaultLanguage="python"
                defaultValue={code}
                options={{
                    formatOnType: true,
                    formatOnPaste: true,
                    minimap: {
                      enabled: false
                    },
                    language: {
                      comments: {
                        lineComment: '#',
                      },
                    },
                  }}
                onChange={handleChangeEditor}
            />
        </div>
    );
}

export default TestSideBarButton;
