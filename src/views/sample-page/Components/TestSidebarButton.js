import { useSelector } from "react-redux";
import { useState } from "react";
import Editor from '@monaco-editor/react';

const TestSideBarButton = () => {
    const test_code = useSelector((state) => state.automation.genratedTest);
    const [code, setCode] = useState(test_code.trim()); // Use trim to remove extra white spaces

    return (
        <div className="editor-container" style={{ height: '100vh', width: '100vw', overflowX: 'hidden' }}>
            <Editor
                width="100%"
                height="100%"
                defaultLanguage="python"
                defaultValue={code}
            />
        </div>
    );
}

export default TestSideBarButton;
