import { TASK_NAME } from "./constants";

export function handleExecution(taskName: string, parameters: any) {
    let result;
    switch(taskName) {
        case TASK_NAME.ADDITION:  
            const sumArr = parameters as [];
            result = sumArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            break;
        case TASK_NAME.MULTIPLICATION:
            const multArr = parameters as [];
            result = multArr.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
            break;
        default:
            result = null;
    }
    return result;
}

export function delay (delayInms) {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};