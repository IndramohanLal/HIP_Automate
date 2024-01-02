import React, { useState } from 'react';
import { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TestResults = ({ testResult, testResultsLists }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [responseRecived, setResponseRecived] = useState(true);
  const [testResults, setTestResults] = useState({
errors: [],
    failed_tests: [],
    success_tests: [],
    summary: ''
  });

  useEffect(() => {
    if (testResult) {
      setTestResults({ ...testResult });
    } else if (testResultsLists) {
      setTestResults({ ...testResultsLists });
    }

    if (testResults.summary !== '') {
      setResponseRecived(true);
    }
  }, [testResult, testResultsLists]);
  return (
    <div >
      {responseRecived && <h4>{testResults.success_tests.length + testResults.failed_tests.length} Tests Run, {testResults.success_tests.length} Passed, {testResults.failed_tests.length} Failed, {testResults.errors.length} Errors</h4>}
      {responseRecived &&
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList style={tabListStyles}>
            <Tab style={tabStyles}>All</Tab>
            <Tab style={tabStyles}>Passed</Tab>
            <Tab style={tabStyles}>Failed</Tab>
            <Tab style={tabStyles}>Error</Tab>
          </TabList>
          <TabPanel >
            {[
              ...testResults.success_tests.map((result, index) => ({
                status: 'PASS',
                content: result,
                key: index,
                color: '#00cc00'
              })),
              ...testResults.failed_tests.map((result, index) => ({
                status: 'FAIL',
                content: result,
                key: index,
                color: '#ff0000'
              })),
              ...testResults.errors.map((result, index) => ({
                status: 'ERROR',
                content: result,
                key: index,
                color: '#FF5733'
              }))
            ].map(({ status, content, key, color }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
                <button
                  style={{
                    height: '25px',
                    width: '45px',
                    marginRight: '5px',
                    backgroundColor: color,
                    border: 'none',
                    outline: 'none',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    padding: '5px'
                  }}
                >
                  {status}
                </button>
                <p style={{ margin: 0, fontSize: '14px' }}>{content}</p>
              </div>
            ))}
          </TabPanel>
          <TabPanel>
            {testResults.success_tests.map((result, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
                <button
                  style={{
                    height: '25px',
                    width: '45px',
                    marginRight: '5px',
                    backgroundColor: '#00cc00',
                    border: 'none',
                    outline: 'none',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    padding: '5px'
                  }}
                >
                  PASS
                </button>
                <p style={{ margin: 0, fontSize: '14px' }}>{result}</p>
              </div>
            ))}
          </TabPanel>
          <TabPanel>
            {testResults.failed_tests.map((result, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
                <button
                  style={{
                    height: '25px',
                    width: '45px',
                    marginRight: '5px',
                    backgroundColor: '#ff0000',
                    border: 'none',
                    outline: 'none',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    padding: '5px'
                  }}
                >
                  FAIL
                </button>
                <p style={{ margin: 0, fontSize: '14px' }}>{result}</p>
              </div>
            ))}
          </TabPanel>
          <TabPanel>
            {testResults.errors.map((result, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
                <button
                  style={{
                    height: '25px',
                    width: '45px',
                    marginRight: '5px',
                    backgroundColor: '#FF5733',
                    border: 'none',
                    outline: 'none',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    padding: '5px'
                  }}
                >
                  ERROR
                </button>
                <p style={{ margin: 0, fontSize: '14px' }}>{result}</p>
              </div>
            ))}
          </TabPanel>
        </Tabs>
      }
    </div>
  );
};

const tabListStyles = {
  display: 'flex',
  justifyContent: 'start',
  marginBottom: '10px',
  borderBottom: 'none' // Remove the horizontal line
};

const tabStyles = {
  width: '60px', // Set the width you desire
  padding: '2px',
  cursor: 'pointer',
  backgroundColor: '#f0f0f0',
  marginRight: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  borderRadius: '5px' // Default border radius
};

export default TestResults;
