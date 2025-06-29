import React, { FC } from "react";
import {Card} from "antd";
import { Checkbox, Col, Row } from 'antd';

interface FilterCardParams {
    children?: React.ReactNode;
}

const FilterCard: FC<FilterCardParams> = ({ children }) => {
    //return <Card>{children}</Card>;
    return <Checkbox.Group style={{ width: '100%' }}>
        <Row>
            {children}
        </Row>
    </Checkbox.Group>
}

export default FilterCard;