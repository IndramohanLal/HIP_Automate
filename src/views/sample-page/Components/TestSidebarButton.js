import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Editor from '@monaco-editor/react';
import { setGenraetedTest } from '../../../store/postman'; // Update the import path accordingly

const TestSideBarButton = () => {
    const dispatch = useDispatch();
    const test_code = useSelector((state) => state.automation.genratedTest);
    const [code, setCode] = useState(test_code.trim()); // Use trim to remove extra white spaces

    const handleChangeEditor = (newCode) => {
        // Update local state
        const modifiedCode = newCode.trim();
        setCode(modifiedCode);

        // Dispatch the new code to the Redux store
        dispatch(setGenraetedTest(modifiedCode));
    };

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
                    // Additional editor options
                    language: {
                      comments: {
                        lineComment: '#',  // Adjust this line based on your language
                      },
                    },
                  }}
                onChange={handleChangeEditor}
            />
        </div>
    );
}

export default TestSideBarButton;
