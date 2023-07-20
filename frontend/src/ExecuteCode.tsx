import axios from 'axios';
import {Button} from "@chakra-ui/react";


function ExecuteCode() {
    const PISTON_API_URL = 'https://emkc.org/api/v1/piston/execute';
    const LANGUAGE = 'typescript';
    const CODE = `
  function add(a: number, b: number): number {
    return a + b;
  }
  console.log(add(5, 3));
`;

    const executeCode = async () => {
        try {
            const response = await axios.post(PISTON_API_URL, {
                language: LANGUAGE,
                version: 'latest',
            });

            if (response.data.run?.stdout) {
                console.log('Output:', response.data.run.stdout);
            } else {
                console.log('Error:', response.data.run?.stderr);
            }
        } catch (error) {
            console.error('Error:', error.response?.data);
        }
    };


    return (
        <Button onClick={executeCode}>click me</Button>
        )

}
export default ExecuteCode
