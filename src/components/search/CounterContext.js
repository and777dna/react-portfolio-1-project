import { createContext, useContext, useState } from "react";

const CounterContext = createContext();

export function CounterContextProvider({ children }) {
    const [value, setValue] = useState(3)

    const increment = () => { setValue((prev) => Math.min(prev + 1, 10)) }
    const decrement = () => { setValue((prev) => Math.max(prev - 1, 1))  }

    return <CounterContext.Provider value={{ value, increment, decrement }}>{children}</CounterContext.Provider>;
}


export function useCounter() {
    return useContext(CounterContext);
}