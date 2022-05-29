import { useState } from "react";

import useAppSelector from "../../customHooks/useAppSelector";
import { GamesOrderProps } from "./GamesOrder.props";

const GamesOrder = ({title, ...restProps}: GamesOrderProps) => {
    return (
        <div>Games order</div>
    )
}

export default GamesOrder;