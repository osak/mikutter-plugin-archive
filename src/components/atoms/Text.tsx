import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import {Style} from "@material-ui/core/styles/createTypography";

interface TextProps {
    style?: Style;
    className?: string;
    children: any;
}

export function Text(props: TextProps) {
    if (props.style) {
        return <Typography variant={props.style} color="inherit">{props.children}</Typography>
    }
    return <span className={props.className}>{props.children}</span>
}