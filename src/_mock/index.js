import { setupWorker } from 'msw/browser';
 
import userMockApi from './handlers/_user'; 

const handlers = [...userMockApi];
const worker = setupWorker(...handlers);

export default worker;
