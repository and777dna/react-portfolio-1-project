import { FC } from "react";
import { Button } from "antd";
import React from "react";

interface FilterButtonParams {
    size?: string
}

const FilterButton: FC<FilterButtonParams> = () => {
    //return <Button onClick={onClick}>//TODO: to create onClick later here
    return <Button>
        filter
    </Button>
}

export default FilterButton