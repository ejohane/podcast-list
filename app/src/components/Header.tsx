import { AppBar, makeStyles } from "@material-ui/core"
import React from "react"
import { Search } from "./Search";
import { SortDirection } from "podcast-list-models";

/**
 * Header styles
 */
const useStyles = makeStyles(() => ({
    search: {
        width: "500px"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        overflowY: "hidden"
    },
}));

/**
 * Header props
 */
interface HeaderProps {
    onSearch?: (searchValue: string) => void
    onSortChange?: (sort: SortDirection) => void,
    enableSort?: boolean
}

/**
 * Returns the Header component.
 * 
 * @param props Header props
 */
export const Header = (props: HeaderProps) => {

    const classes = useStyles();

    return (
        <AppBar position="sticky" style={{ background: "#222326" }}>
            <div className={classes.container}>
                <div className={classes.search}>
                    <Search onSearch={props.onSearch} onSortChange={props.onSortChange} enableSort={props.enableSort} />
                </div>
            </div>
        </AppBar >
    )

}
