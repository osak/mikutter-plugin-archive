import * as React from "react";
import {Text} from "../atoms/Text";
import {Style} from "@material-ui/core/styles/createTypography";
import {SyntheticEvent} from "react";
import { history } from '../../history';

export interface LinkStyles {
    text?: Style;
}

interface Props {
    href: string;
    className?: string;
    styles?: LinkStyles;
    children?: any;
}

const DEFAULT_STYLES = {
    text: undefined
};

function onClick(e: SyntheticEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    history.push(href);
}

export function Link(props: Props) {
    const styles: LinkStyles = props.styles || DEFAULT_STYLES;
    return <a href={props.href} className={props.className} onClick={(e) => onClick(e, props.href)}>
        <Text style={styles.text}>{props.children}</Text>
    </a>;
}